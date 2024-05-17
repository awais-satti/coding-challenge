import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, customerSchema } from './entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: customerSchema },
    ]),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
