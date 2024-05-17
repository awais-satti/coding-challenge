import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './entities/customer.entity';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerInput);

    return await createdCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }

  async findOne(_id: string): Promise<Customer> {
    return await this.customerModel.findById(_id).exec();
  }

  async update(updateCustomerInput: UpdateCustomerInput): Promise<Customer> {
    const { _id, ...updateData } = updateCustomerInput;

    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${_id} not found`);
    }
    return updatedCustomer;
  }

  async remove(_id: string) {
    const deleteCustomer = await this.customerModel.findByIdAndDelete(_id);
    deleteCustomer.updatedAt = new Date();
    if (!deleteCustomer) {
      throw new NotFoundException(`Customer with ID ${_id} not found`);
    }
    return deleteCustomer;
  }
}
