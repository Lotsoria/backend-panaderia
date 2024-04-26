import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
            status: Number(env.DELETED),
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
            status: Number(env.DELETED),
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
  async createProduct(dataProduct: CreateProduct, imageFile: Express.Multer.File) {
    try {
      const imageUrl = imageFile ? `http://localhost:3000/uploads/${imageFile.filename}` : null;

      const data = await this.prisma.products.create({
        data: {
          name: dataProduct.name,
          description: dataProduct.description,
          status: Number(env.ACTIVE),
          price: dataProduct.price,
          stock: Number(dataProduct.stock),
          image_url: imageUrl,
          createdAt: new Date(),
        },
      });

      return 'Registro creado correctamente ' + toJson(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //TODO: Funcion para actualizar un producto
  async updateProduct(dataProduct: UpdateProduct, id: number, imageFile?: Express.Multer.File) {
    const imageUrl = imageFile ? `http://localhost:3000/uploads/${imageFile.filename}` : dataProduct.image_url;
    try {
      const dataUpdate: UpdateProduct = {
        ...dataProduct,
        stock: Number(dataProduct.stock),
        image_url: imageUrl,
        updatedAt: new Date(),
      };
      const data = await this.prisma.products.update({
        where: {
          id: Number(id),
        },
        data: dataUpdate,
      });
      return 'Registro actualizado correctamente ' + toJson(data);
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  //TODO: Funcion para eliminar un producto
  async deleteProduct(id: number) {
    console.log(id);
    try {
      const data = await this.prisma.products.update({
        where: {
          id: Number(id),
        },
        data: {
          status: Number(env.DELETED),
          updatedAt: new Date(),
        },
      });
      console.log(data);
      return 'Registro eliminado correctamente ' + toJson(data);
    } catch (error) {
      return error;
    }
  }

  //TODO: Función para configurar Multer


  static getMulterOptions(): import("@nestjs/platform-express/multer/interfaces/multer-options.interface").MulterOptions {
    return {
      storage: diskStorage({
        destination: './uploads', // Directorio donde se guardarán las imágenes
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname); // Extrae la extensión del archivo original
          const filename = `${uniqueSuffix}${fileExtName}`; // Crea el nombre del archivo con el sufijo único y la extensión del archivo original
          callback(null, filename);
        },
      }),
    };
  }
}
