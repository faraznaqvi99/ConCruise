import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customer.service';
import customersModel from './customer.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: customersModel }]),
  ],
  controllers: [CustomerController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomerModule {}
