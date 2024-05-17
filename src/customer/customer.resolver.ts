import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customersService: CustomerService) {}

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customersService.create(createCustomerInput);
  }

  @Query(() => [Customer], { name: 'customers' })
  findAll() {
    return this.customersService.findAll();
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${_id}`);
    }
    return this.customersService.findOne(_id);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.customersService.update(updateCustomerInput);
  }

  @Mutation(() => Customer)
  removeCustomer(@Args('_id', { type: () => String }) _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${_id}`);
    }
    return this.customersService.remove(_id);
  }
}
