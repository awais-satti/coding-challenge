import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { LineItemsModule } from './line_items/line_items.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/demo'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    EmployeesModule,
    OrderModule,
    CustomerModule,
    LineItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
