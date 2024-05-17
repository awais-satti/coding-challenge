import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderState } from './enum/order.enum';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${_id}`);
    }
    return this.orderService.findOne(_id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  async updateOrderState(
    @Args('orderId') orderId: string,
    @Args('newState') newState: OrderState,
    @Args('employeeId', { nullable: true }) employeeId?: string,
    @Args({
      name: 'lineItemIds',
      type: () => [String],
      nullable: 'itemsAndList',
    })
    lineItemIds?: string[],
  ): Promise<Order> {
    try {
      const order = await this.orderService.updateOrderState(
        orderId,
        newState,
        employeeId,
        lineItemIds,
      );
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Order)
  removeOrder(@Args('_id', { type: () => String }) _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${_id}`);
    }
    return this.orderService.remove(_id);
  }
}
