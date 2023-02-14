import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateOrderDto) {
    for (const product_id of data.products_ids) {
      const orders_products = await this.prismaService.order_Product.findFirst({
        where: {
          order_id: data.id,
        },
      });

      if (!orders_products) {
        await this.prismaService.order.create({
          data: {
            id: data.id,
            client: data.client,
            table: data.table,
            nif: data.nif,
            paymethod: data.payment_method,
            total_pay: data.total_pay,
            status: false,
            status_payment: false,
          },
        });
      }

      await this.prismaService.order_Product.create({
        data: {
          product_id: product_id.product_id,
          quantity: product_id.quantity,
          order_id: data.id,
        },
      });
    }
  }

  findAll() {
    try {
      return this.prismaService.$queryRaw`
        SELECT 
          o.id, o.client , o.table , o.paymethod , op.order_id, p.id AS product_id, p.name , p.price , op.quantity , (p.price * op.quantity) AS total
        FROM 
          orders o 
        INNER JOIN orders_products op 
          ON	o.id = op.order_id 
        INNER JOIN products p 
          ON op.product_id = p.id 
        WHERE 
          o.status = 0
        ORDER BY 
          o.create_at
      `;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.order.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateOrderDto) {
    try {
      return this.prismaService.order.update({
        where: {
          id,
        },
        data,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.order.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
}
