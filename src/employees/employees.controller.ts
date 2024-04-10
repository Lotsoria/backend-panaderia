import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployee } from 'src/dto/employees.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get('find')
  async getAllEmployees() {
    return await this.employeesService.getAllEmployees();
  }

  @Get('find/:id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeesService.getEmployeeById(id);
  }

  @Post('create')
  async createEmployee(@Body() dataEmployee: CreateEmployee) {
    console.log(dataEmployee);
    return await this.employeesService.createEmployee(dataEmployee);
  }

  @Put('update/:id')
  async updateEmployee(
    @Body() dataEmployee: CreateEmployee,
    @Param('id') id: number,
  ) {
    return await this.employeesService.updateEmployee(dataEmployee, id);
  }

  @Put('delete/:id')
  async deleteEmployee(@Param('id') id: number) {
    return await this.employeesService.deleteEmployee(id);
  }
}
