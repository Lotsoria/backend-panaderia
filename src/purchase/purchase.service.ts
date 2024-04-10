import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async purchaseInvoice(data: any) {
    try {
      // Iniciar la transacción
      const result = await this.prisma.$transaction(async (prisma) => {
        const dataPurchase = await prisma.purchase_invoices.create({
          data: {
            supplier: data.supplier,
            createdAt: new Date(),
          },
        });

        for (const product of data.products) {
          console.log(product);
          await prisma.purchase_invoice_details.create({
            data: {
              products_id: product.products_id,
              lot: product.lot,
              purchase_invoices_id: dataPurchase.id,
              createdAt: new Date(),
            },
          });

          const productFind = await prisma.products.findUnique({
            where: {
              id: product.products_id,
            },
          });
          console.log(productFind);
          productFind.stock += product.lot;

          await prisma.products.update({
            where: {
              id: product.products_id,
            },
            data: {
              stock: productFind.stock,
            },
          });
        }

        return 'Compra realizada con éxito';
      });

      return result;
    } catch (error) {
      return error;
    }
  }
}
