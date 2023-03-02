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
      const orders_products = await this.prismaService.order.findUnique({
        where: {
          id: data.id,
        },
      });

      await this.prismaService.stock.create({
        data: {
          product_id: product_id.product_id,
          quant: product_id.quantity,
          type: 'OUT',
        },
      });

      if (product_id.extras.length > 0) {
        product_id.extras.map(async (extra) => {
          await this.prismaService.product_Order_Extra.create({
            data: {
              extra_id: extra.id,
              order_id: data.id,
              product_id: product_id.product_id,
            },
          });
        });
      }

      if (product_id.options.length > 0) {
        product_id.options.map(async (option) => {
          await this.prismaService.product_Order_Option.create({
            data: {
              option_id: option.id,
              order_id: data.id,
              product_id: product_id.product_id,
            },
          });
        });
      }

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

      const productInOrder = await this.prismaService.order_Product.findFirst({
        where: {
          product_id: product_id.product_id,
          order_id: data.id,
        },
      });

      if (!productInOrder) {
        await this.prismaService.order_Product.create({
          data: {
            product_id: product_id.product_id,
            quantity: product_id.quantity,
            order_id: data.id,
          },
        });
      } else {
        await this.prismaService.order_Product.update({
          where: {
            id: productInOrder.id,
          },
          data: {
            quantity: productInOrder.quantity,
          },
        });
      }
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

    const listOptions =
      await this.prismaService.product_Order_Option.findMany();
    const listExtras = await this.prismaService.product_Order_Extra.findMany();

    const newListOrder = orders.map((order) => {
      const products = listProducts.filter((product) => {
        const extras = listExtras.filter((extra) => {
          if (extra.product_id === product.id && extra.order_id === order.id) {
            return extra;
          }
        });
        const options = listOptions.filter((option) => {
          if (
            option.product_id === product.id &&
            option.option_id === order.id
          ) {
            return option;
          }
        });
        if (product.order_id === order.id) {
          return {
            ...product,
            options: options,
            extras: extras,
          };
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

  async findOrders() {
    return await this.prismaService.order.findMany({
      orderBy: {
        create_at: 'asc',
      },
    });
  }

  async findProductsInOrderById(id: string) {
    try {
      return await this.prismaService.$queryRaw`
        SELECT
          p.id,
          p.name as product ,
          SUM(op.quantity) AS quantity,
          p.price 
        FROM
          orders_products op
        INNER JOIN orders o 
                          ON
          op.order_id = o.id
        INNER JOIN products p 
                          ON
          p.id = op.product_id
        WHERE
          o.status = 0 AND o.id = ${id}
        GROUP BY
          p.name,
          p.id
      `;
    } catch (err) {
      throw new Error(err);
    }
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
