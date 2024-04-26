import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { toJson } from '../utils/shared.utils';
import { CreateEmployee, UpdateEmployee } from 'src/dto/employees.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  //TODO: Funcion para buscar a todos los empleados
  async getAllEmployees() {
    try {
      const data = await this.prisma.employees.findMany({
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

  //TODO: Funcion para buscar un empleado por su id
  async getEmployeeById(id: number) {
    console.log(id);
    try {
      const dataEmployee = await this.prisma.employees.findUnique({
        where: {
          id: Number(id),
          NOT: {
            status: Number(env.DELETED),
          },
        },
      });
      if (dataEmployee === null) {
        return 'El empleado no se encuentra registrado';
      }
      return dataEmployee;
    } catch (error) {
      return error;
    }
  }

  //TODO: funcion para crear un empleado
  async createEmployee(body: CreateEmployee) {
    try {
      const data = await this.prisma.employees.create({
        data: {
          dpi: body.dpi,
          name: body.name,
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

  //TODO: Funcion para actualizar un empleado
  async updateEmployee(body: UpdateEmployee, id: number) {
    try {
      const dataUpdate: UpdateEmployee = {
        ...body,
        updatedAt: new Date(),
      };
      const data = await this.prisma.employees.update({
        where: {
          id: Number(id),
        },
        data: dataUpdate,
      });
      return 'Registro actualizado correctamente ' + toJson(data);
    } catch (error) {
      return error;
    }
  }

  //TODO: Funcion para eliminar un empleado
  async deleteEmployee(id: number) {
    try {
      const data = await this.prisma.employees.update({
        where: {
          id: Number(id),
        },
        data: {
          status: Number(env.DELETED),
          updatedAt: new Date(),
        },
      });
      return 'Registro eliminado correctamente ' + toJson(data);
    } catch (error) {
      return error;
    }
  }
}
