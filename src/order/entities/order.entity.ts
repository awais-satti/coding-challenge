import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { LineItem } from 'src/line_items/entities/line_item.entity';
import { OrderState } from 'src/order/enum/order.enum';

@Schema()
@ObjectType()
export class Order extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({
    type: String,
    isRequired: true,
  })
  state: OrderState;

  @Field(() => [LineItem], { nullable: true })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LineItem' }] })
  assassignedLineItems: LineItem[];

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  assignedCustomer?: Customer;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  assignedEmployee?: Employee;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
