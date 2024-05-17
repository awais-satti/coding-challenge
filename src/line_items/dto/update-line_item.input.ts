import { IsAlpha, IsMongoId } from 'class-validator';
import { CreateLineItemInput } from './create-line_item.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLineItemInput extends PartialType(CreateLineItemInput) {
  @IsMongoId()
  @Field(() => ID)
  _id: string;

  @IsAlpha()
  @Field({ nullable: true })
  productName?: string;

  @Field({ nullable: true })
  quantity?: number;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  total?: number;
}
