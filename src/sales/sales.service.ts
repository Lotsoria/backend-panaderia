import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}
  //TODO: Funcion para ver todas las ventas
  async getSales() {
    try {
      const sales = await this.prisma.sales_invoices.findMany({
        include: {
          customers: true,
          employees: true,
          sales_invoice_details: {
            include: {
              products: true,
            },
          },
        },
      });
      return sales;
    } catch (error) {
      return error;
    }
  }

  //TODO: Funcion para generar una venta
  async salesInvoice(data: any) {
    try {
      // Iniciar la transacción
      const result = await this.prisma.$transaction(async (prisma) => {
        const dataSales = await prisma.sales_invoices.create({
          data: {
            customers_id: data.customers_id,
            employees_id: data.employees_id,
            createdAt: new Date(),
          },
        });
        let total = 0;
        for (const product of data.products) {
          await prisma.sales_invoice_details.create({
            data: {
              products_id: product.products_id,
              lot: product.lot,
              sales_invoices_id: dataSales.id,
              createdAt: new Date(),
            },
          });

          const productFind = await prisma.products.findUnique({
            where: {
              id: product.products_id,
            },
          });
          productFind.stock -= product.lot;
          total += Number(productFind.price) * product.lot;
          await prisma.products.update({
            where: {
              id: product.products_id,
            },
            data: {
              stock: productFind.stock,
            },
          });
        }
        const updateTotalAmout = await prisma.sales_invoices.update({
            where: {
                id: dataSales.id,
            },
            data: {
                total_amout: total,
            },
            });
        return 'Venta realizada con éxito ' + total + ' $';
      });

      return result;
    } catch (error) {
      return error;
    }
  }
}
