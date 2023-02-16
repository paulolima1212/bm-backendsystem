import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Product } from './dto/order.dto';

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

  async findAll() {
    const orders: Order[] = await this.prismaService.$queryRaw`
        SELECT
          o.id,
          o.client ,
          o.table ,
          o.paymethod
        FROM
          orders o
        WHERE
          o.status = 0
        ORDER BY
          o.create_at
      `;
    const listProducts: Product[] = await this.prismaService.$queryRaw`
        SELECT
          o.id AS order_id, p.id , p.name , p.price , op.quantity 
        FROM
          orders_products op 
        INNER JOIN orders o 
          ON	op.order_id = o.id 
        INNER JOIN products p 
          ON	p.id = op.product_id 
        WHERE
          o.status = 0
        ORDER BY
          o.create_at
      `;

    const newListOrder = orders.map((order) => {
      const products = listProducts.filter((product) => {
        if (product.order_id === order.id) {
          return product;
        }
      });

      return {
        id: order.id,
        client: order.client,
        table: order.table,
        paymethod: order.paymethod,
        products,
      };
    });

    return newListOrder;
  }

  findAllOrders() {
    return this.prismaService.order.findMany();
  }

  async findProductsInOrder() {
    try {
      return await this.prismaService.$queryRaw`
        SELECT
          p.id,
          p.name ,
          SUM(op.quantity) AS quantity
        FROM
          orders_products op
        INNER JOIN orders o 
                  ON
          op.order_id = o.id
        INNER JOIN products p 
                  ON
          p.id = op.product_id
        WHERE
          o.status = 0
        GROUP BY 
          p.name, p.id
      `;
    } catch (err) {
      console.log(err);
      throw new Error(err);
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
