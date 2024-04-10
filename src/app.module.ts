import { Module } from '@nestjs/common';
import { CustumersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SalesModule } from './sales/sales.module';


@Module({
  imports: [CustumersModule, EmployeesModule, ProductsModule, PurchaseModule, SalesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
