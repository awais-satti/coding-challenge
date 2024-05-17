import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeInput);

    return await createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeModel.find().exec();
  }

  async findOne(_id: string): Promise<Employee> {
    return await this.employeeModel.findById(_id).exec();
  }

  async update(updateEmployeeInput: UpdateEmployeeInput): Promise<Employee> {
    const { _id, ...updateData } = updateEmployeeInput;

    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${_id} not found`);
    }
    return updatedEmployee;
  }

  async remove(_id: string) {
    const deleteEmployee = await this.employeeModel.findByIdAndDelete(_id);
    if (!deleteEmployee) {
      throw new NotFoundException(`Employee with ID ${_id} not found`);
    }
    return deleteEmployee;
  }
}
