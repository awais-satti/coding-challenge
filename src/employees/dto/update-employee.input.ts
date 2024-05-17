import { IsAlpha, IsEmail, IsMongoId, Length } from 'class-validator';
import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
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
