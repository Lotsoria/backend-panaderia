import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustumersService } from './customers.service';
import { CreateCustomers, UpdatedCustomer } from 'src/dto/custumers.dto';

@Controller('custumers')
export class CustumersController {
  constructor(private custumersService: CustumersService) {}

  @Get('find')
  getAllCustomers() {
    return this.custumersService.getAllCustomers();
  }

  @Get('find/:id')
  getCustomerById(@Param('id') id: number) {
    return this.custumersService.getCustomerById(id);
  }

  @Post('create')
  createCustomer(@Body() data: CreateCustomers) {
    return this.custumersService.createCustomer(data);
  }

  @Put('update/:id')
  updatedCustomer(@Body() data: UpdatedCustomer, @Param('id') id: number) {
    return this.custumersService.updateCustomer(data, id);
  }

  @Put('delete/:id')
  deleteCustomer(@Param('id') id: number) {
    return this.custumersService.deleteCustomer(id);
  }
}
