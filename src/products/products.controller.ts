import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct, UpdateProduct } from 'src/dto/products.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('find')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('find/:id')
  async getProductById(@Param('id') id: number) {
    return await this.productsService.getProductById(id);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image', ProductsService.getMulterOptions()))
  async createProduct(
    @Body() dataProduct: CreateProduct,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<any> {
    return await this.productsService.createProduct(dataProduct, image);
  }

  @Put('update/:id')
  async updateProduct(
    @Body() dataProduct: UpdateProduct,
    @Param('id') id: number,
  ) {
    return await this.productsService.updateProduct(dataProduct, id);
  }

  @Put('delete/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productsService.deleteProduct(id);
  }
}
