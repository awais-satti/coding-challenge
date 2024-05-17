import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLineItemInput } from './dto/create-line_item.input';
import { UpdateLineItemInput } from './dto/update-line_item.input';
import { LineItem } from './entities/line_item.entity';

@Injectable()
export class LineItemsService {
  constructor(
    @InjectModel(LineItem.name) private readonly lineItemModel: Model<LineItem>,
  ) {}

  async create(createLineItemInput: CreateLineItemInput): Promise<LineItem> {
    const createdLineItem = new this.lineItemModel(createLineItemInput);
    const totalPrice = createdLineItem.quantity * createdLineItem.price;
    createdLineItem.total = totalPrice;
    console.log(createdLineItem);

    return createdLineItem.save();
  }

  async findAll(): Promise<LineItem[]> {
    return this.lineItemModel.find().exec();
  }

  async findOne(_id: string): Promise<LineItem> {
    const lineItem = await this.lineItemModel.findById(_id).exec();
    if (!lineItem) {
      throw new NotFoundException(`Line item with ID ${_id} not found`);
    }
    return lineItem;
  }

  async update(updateCustomerInput: UpdateLineItemInput): Promise<LineItem> {
    const { _id, ...updateData } = updateCustomerInput;
    const updatedLineItem = await this.lineItemModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
    if (!updatedLineItem) {
      throw new NotFoundException(`LineItem with ID ${_id} not found`);
    }
    return updatedLineItem;
  }

  async remove(_id: string): Promise<LineItem> {
    const deleteLineitem = await this.lineItemModel.findByIdAndDelete(_id);
    deleteLineitem.updatedAt = new Date();
    if (!deleteLineitem) {
      throw new NotFoundException(`Customer with ID ${_id} not found`);
    }
    return deleteLineitem;
  }
}
