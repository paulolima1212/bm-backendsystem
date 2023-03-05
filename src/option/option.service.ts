import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateOptionDto) {
    try {
      return this.prismaService.option.create({
        data,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    return this.prismaService.option.findMany();
  }

  async findOne(order_id: string, product_id: string) {
    try {
      return await this.prismaService.$queryRaw`
      SELECT 
        o.id, o.option 
      FROM 
        products_orders_options poo 
      INNER JOIN	options o 
        ON poo.option_id = o.id 
      WHERE 
        poo.order_id = ${order_id} AND poo.product_id = ${product_id}`;
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateOptionDto) {
    try {
      return this.prismaService.option.update({
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
      return this.prismaService.option.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new IntersectionObserver(err);
    }
  }
}
