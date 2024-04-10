import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [PrismaModule],
})
export class EmployeesModule {}
