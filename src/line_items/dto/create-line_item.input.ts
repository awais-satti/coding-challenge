import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Length, IsAlpha } from 'class-validator';

@InputType()
export class CreateLineItemInput {
  @Length(4, 20)
  @IsAlpha()
  @Field(() => String)
  productName: string;

  @Field(() => Int)
  @Prop({ required: true })
  quantity: number;

  @Field(() => Float)
  @Prop({ required: true })
  price: number;
}
