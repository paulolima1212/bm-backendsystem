import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StockProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ product_id, quant }: CreateStockProductDto) {
    try {
      return this.prismaService.stock.create({
        data: {
          quant,
          Stock_Product: {
            create: {
              productId: product_id,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.stock.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateStockProductDto) {
    try {
      return this.prismaService.stock.update({
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
      return this.prismaService.stock.delete({
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
