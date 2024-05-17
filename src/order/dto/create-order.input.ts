import { InputType, Field } from '@nestjs/graphql';
import { Equals, IsMongoId } from 'class-validator';
import { OrderState } from '../enum/order.enum';

@InputType()
export class CreateOrderInput {
  @Equals(`${OrderState.OPEN}`, { message: `State must be ${OrderState.OPEN}` })
  @Field(() => String)
  state: OrderState; // Assign 'OPEN' as the default value

  @IsMongoId()
  @Field(() => String)
  assignedCustomerId: string;
}
