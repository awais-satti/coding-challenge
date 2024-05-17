import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { EmployeesModule } from 'src/employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Order } from './entities/order.entity';
import {
  Employee,
  EmployeeSchema,
} from 'src/employees/entities/employee.entity';
import { CustomerModule } from 'src/customer/customer.module';
import {
  Customer,
  customerSchema,
} from 'src/customer/entities/customer.entity';
import { LineItemsModule } from 'src/line_items/line_items.module';
import {
  LineItem,
  LineItemSchema,
} from 'src/line_items/entities/line_item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Customer.name, schema: customerSchema },
      { name: LineItem.name, schema: LineItemSchema },
    ]),
    EmployeesModule,
    CustomerModule,
    LineItemsModule,
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
