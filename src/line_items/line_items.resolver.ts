import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LineItemsService } from './line_items.service';
import { LineItem } from './entities/line_item.entity';
import { CreateLineItemInput } from './dto/create-line_item.input';
import { UpdateLineItemInput } from './dto/update-line_item.input';

@Resolver(() => LineItem)
export class LineItemsResolver {
  constructor(private readonly lineItemsService: LineItemsService) {}

  @Mutation(() => LineItem)
  createLineItem(
    @Args('createLineItemInput') createLineItemInput: CreateLineItemInput,
  ) {
    return this.lineItemsService.create(createLineItemInput);
  }

  @Query(() => [LineItem], { name: 'lineItems' })
  findAll() {
    return this.lineItemsService.findAll();
  }

  @Query(() => LineItem, { name: 'lineItem' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.lineItemsService.findOne(_id);
  }

  @Mutation(() => LineItem)
  updateLineItem(
    @Args('updateLineItemInput') updateLineItemInput: UpdateLineItemInput,
  ) {
    return this.lineItemsService.update(updateLineItemInput);
  }

  @Mutation(() => LineItem)
  removeLineItem(@Args('_id', { type: () => String }) _id: string) {
    return this.lineItemsService.remove(_id);
  }
}
