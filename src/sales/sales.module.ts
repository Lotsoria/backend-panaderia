import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SalesService],
  controllers: [SalesController],
  imports: [PrismaModule],
})
export class SalesModule {}
