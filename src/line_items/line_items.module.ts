import { Module } from '@nestjs/common';
import { LineItemsService } from './line_items.service';
import { LineItemsResolver } from './line_items.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LineItem, LineItemSchema } from './entities/line_item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LineItem.name, schema: LineItemSchema },
    ]),
  ],
  providers: [LineItemsResolver, LineItemsService],
  exports: [LineItemsService],
})
export class LineItemsModule {}
