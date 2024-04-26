import { Injectable, NotFoundException } from '@nestjs/common';
import { env } from 'process';
import { toJson } from '../utils/shared.utils';
import { CreateCustomers, UpdatedCustomer } from 'src/dto/custumers.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustumersService {
  constructor(private prisma: PrismaService) {}

  //TODO: Funcion para buscar a todos los clientes
  async getAllCustomers() {
    return await this.prisma.customers.findMany({
      where: {
        NOT: {
          status: Number(env.DELETED),
        },
      },
    });
  }

  //TODO: Funcion para buscar un cliente por su id
  async getCustomerById(id: number) {
    try {
      const dataCustomer = await this.prisma.customers.findUnique({
        where: {
          id: Number(id),
          status: {
            not: Number(env.DELETED),
          },
        },
      });
      if (dataCustomer === null) {
        return 'El cliente no se encuentra registrado';
      }
      return dataCustomer;
    } catch (error) {
      return error;
    }
  }
  //TODO: Funcion para crear un cliente
  async createCustomer(body: CreateCustomers) {
    try {
      const data = await this.prisma.customers.create({
        data: {
          nit: body.nit,
          name: body.name,
          dpi: body.dpi,
          last_name: body.last_name,
          phone: body.phone,
          email: body.email,
          status: Number(env.ACTIVE),
          createdAt: new Date(),
        },
      });
      return 'Registro creado correctamente ' + toJson(data);
    } catch (error) {
      return error;
    }
  }

  //TODO: Funcion para actualizar un usuario
  async updateCustomer(body: UpdatedCustomer, id: number) {
    try {
      const dataUpdate: UpdatedCustomer = {
        ...body,
        updatedAt: new Date(),
      };
      const data = await this.prisma.customers.update({
        where: {
          id: Number(id),
        },
        data: dataUpdate,
      });
      return 'Registro actualizado correctamente' + toJson(data);
    } catch (error) {
      return error.message;
    }
  }

  //TODO: Funcion para realizar un borrado logico
  async deleteCustomer(id: number) {
    try {
      const data = await this.prisma.customers.update({
        where: {
          id: Number(id),
        },
        data: {
          status: Number(env.DELETED),
          updatedAt: new Date(),
        },
      });
      return 'Registro eliminado correctamente'+ toJson(data);
    } catch (error) {}
  }
}
