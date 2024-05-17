import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return this.employeesService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'employees' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${_id}`);
    }
    return this.employeesService.findOne(_id);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return this.employeesService.update(updateEmployeeInput);
  }

  @Mutation(() => Employee)
  removeEmployee(@Args('_id', { type: () => String }) _id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(`Invalid MongoDB ObjectId: ${_id}`);
    }
    return this.employeesService.remove(_id);
  }
}
