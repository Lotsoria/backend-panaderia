import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('purchase')
@Controller('purchase')
export class PurchaseController {

    constructor(
        private purchaseService: PurchaseService
    ) {};


    @Post('create')
    async purchaseInvoice(@Body() data: any) {
        return await this.purchaseService.purchaseInvoice(data);
    } 

}
