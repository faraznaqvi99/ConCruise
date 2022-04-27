import { Controller, Get } from '@nestjs/common';
import { CruisersService } from './cruiser.service';

@Controller('customer')
export class CruiserController {
  constructor(private CustomersService: CruisersService) {}

  @Get()
  async getCustomers() {
    return await this.CustomersService.findAll();
  }
}
