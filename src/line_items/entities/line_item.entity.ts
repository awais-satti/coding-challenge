import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, Float, ObjectType, Int, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class LineItem extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  productName: string;

  @Field(() => Int)
  @Prop({ required: true })
  quantity: number;

  @Field(() => Float)
  @Prop({ required: true })
  price: number;

  @Field(() => Float, { nullable: true })
  @Prop()
  total: number;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const LineItemSchema = SchemaFactory.createForClass(LineItem);
