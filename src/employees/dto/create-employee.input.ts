import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, Length } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Length(4, 20)
  @IsAlpha()
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;
}
