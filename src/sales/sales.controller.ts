import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
    constructor(
        private salesService: SalesService
    ) {}
    @Get()
    async getSales() {
        return await this.salesService.getSales();
    }

    @Post('create')
    async salesInvoice(@Body() data: any) {
        console.log(data);
        return await this.salesService.salesInvoice(data);
    } 
    
}
