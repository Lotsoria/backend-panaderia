import { Module } from '@nestjs/common';
import { CustumersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';


@Module({
  imports: [CustumersModule, EmployeesModule, ProductsModule, PurchaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
