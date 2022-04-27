import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateCustomerDto } from 'src/dtos/CreateCustomerDto';
import { CustomersService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private CustomersService: CustomersService) {}

  @Get()
  async getCustomers() {
    return await this.CustomersService.findAll();
  }

  @Post()
  async createCustomers(@Body() CreateCustomerDto: CreateCustomerDto) {
    return await this.CustomersService.create(CreateCustomerDto);
  }

  @Put()
  async editCustomer(@Body() editCustomerDto: CreateCustomerDto) {
    return await this.CustomersService.edit(editCustomerDto);
  }

  @Delete()
  async deleteCustomers(@Body() ids: string[]) {
    return await this.CustomersService.delete(ids);
  }
}
