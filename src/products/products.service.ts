import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { CreateProduct, UpdateProduct } from 'src/dto/products.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { toJson } from '../utils/shared.utils';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  //TODO: Funcion para buscar todos los productos
  async getAllProducts() {
    try {
      const data = await this.prisma.products.findMany({
        where: {
          NOT: {
            status: Number(env.DELETE),
          },
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  //TODO: Funcion para buscar por id un producto
  async getProductById(id: number) {
    try {
      const dataProduct = await this.prisma.products.findUnique({
        where: {
          id: Number(id),
          NOT: {
            status: Number(env.DELETE),
          },
        },
      });
      if (dataProduct === null) {
        return 'El producto no existe en el inventario';
      }
      return dataProduct;
    } catch (error) {
      return error;
    }
  }

  //TODO: Funcion para crear un producto
  async createProduct(dataProduct: CreateProduct) {
    try {
      const data = await this.prisma.products.create({
        data: {
          name: dataProduct.name,
          description: dataProduct.description,
          status: Number(env.ACTIVE),
          price: dataProduct.price,
          stock: Number(dataProduct.stock),
          createdAt: new Date(),
        },
      });

      return 'Registro creado correctamente ' + toJson(data);
    } catch (error) {
      return error;
    }
  }

  //TODO: Funcion para actualizar un producto
    async updateProduct(dataProduct: UpdateProduct, id: number) {
        try {
        const dataUpdate: UpdateProduct = {
            ...dataProduct,
            updatedAt: new Date(),
        };
        const data = await this.prisma.products.update({
            where: {
            id: Number(id),
            },
            data: dataUpdate
        });
        return 'Registro actualizado correctamente ' + toJson(data);
        } catch (error) {
        return error;
        }
    }

    //TODO: Funcion para eliminar un producto
    async deleteProduct(id: number) {
        try {
        const data = await this.prisma.products.update({
            where: {
            id: Number(id),
            },
            data: {
            status: Number(env.DELETE),
            updatedAt: new Date(),
            },
        });
        return 'Registro eliminado correctamente ' + toJson(data);
        } catch (error) {
        return error;
        }
    }
}
