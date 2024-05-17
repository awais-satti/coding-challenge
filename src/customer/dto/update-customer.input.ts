import { IsAlpha, IsEmail, IsMongoId, Length } from 'class-validator';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateCustomerInput } from './create-customer.input';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @IsMongoId()
  @Field(() => ID)
  _id: string;

  @Length(4, 20)
  @IsAlpha()
  @Field({ nullable: true })
  name?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;
}
