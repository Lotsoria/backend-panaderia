import { Module } from '@nestjs/common';
import { CustumersController } from './customers.controller';
import { CustumersService } from './customers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CustumersController],
  providers: [CustumersService],
  imports: [PrismaModule],
})
export class CustumersModule {}
