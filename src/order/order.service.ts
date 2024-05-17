import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderState } from 'src/order/enum/order.enum';
import { Employee } from 'src/employees/entities/employee.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { LineItem } from 'src/line_items/entities/line_item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Employee.name) private readonly employeModel: Model<Employee>,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(LineItem.name) private readonly lineItemModel: Model<LineItem>,
  ) {}
  async create(createOrderInput: CreateOrderInput) {
    const customer = await this.customerModel.findById(
      createOrderInput.assignedCustomerId,
    );

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderInput.assignedCustomerId} not found`,
      );
    }
    const createObject = {
      state: createOrderInput.state,
      assignedCustomer: customer,
    };

    const createdOrder = await new this.orderModel(createObject);

    return await createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel
      .find()
      .populate('assignedEmployee')
      .populate('assignedCustomer')
      .populate('assassignedLineItems');
  }

  async findOne(_id: string) {
    return await this.orderModel
      .findById(_id)
      .populate('assignedEmployee')
      .populate('assignedCustomer')
      .populate('assassignedLineItems')
      .exec();
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  async updateOrderState(
    orderId: string,
    newState: OrderState,
    employeId?: string,
    lineItemIds?: string[],
  ): Promise<Order> {
    const order = await this.orderModel
      .findById(orderId)
      .populate('assignedEmployee')
      .populate('assignedCustomer')
      .populate('assassignedLineItems')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    if (newState === 'IN_PROGRESS' && !employeId) {
      throw new BadRequestException(
        `Employee must be provided for orders in progress`,
      );
    }

    if (!this.isValidStateTransition(order.state, newState)) {
      throw new BadRequestException(`Invalid state transition`);
    }

    if (employeId) {
      const employee = await this.employeModel.findById(employeId).exec();
      if (!employee) {
        throw new NotFoundException(`Employe with id ${employeId} not found`);
      }
      order.assignedEmployee = employee;
    }
    if (lineItemIds) {
      const lineItems = await this.lineItemModel
        .find({ _id: { $in: lineItemIds } })
        .exec();
      if (lineItems.length !== lineItemIds.length) {
        throw new NotFoundException(`One or more line items not found`);
      }
      order.assassignedLineItems = lineItems;
    }
    if (
      newState === OrderState.COMPLETE &&
      order.assassignedLineItems.length === 0
    ) {
      throw new BadRequestException(
        `Order must have line items to be completed`,
      );
    }
    order.state = newState;
    order.updatedAt = new Date();

    return await order.save();
  }
  private isValidStateTransition(
    currentState: OrderState,
    nextState: OrderState,
  ): boolean {
    switch (currentState) {
      case OrderState.OPEN:
        return nextState === OrderState.IN_PROGRESS;
      case OrderState.IN_PROGRESS:
        return nextState === OrderState.COMPLETE;
      default:
        return false;
    }
  }

  async remove(_id: string) {
    const deleteOrder = await this.orderModel.findByIdAndDelete(_id);
    if (!deleteOrder) {
      throw new NotFoundException(`Order with ID ${_id} not found`);
    }
    return deleteOrder;
  }
}
