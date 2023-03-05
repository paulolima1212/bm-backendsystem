import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExtraService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateExtraDto) {
    try {
      return this.prismaService.extra.create({
        data,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    try {
      return this.prismaService.extra.findMany();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(order_id: string, product_id: string) {
    try {
      return await this.prismaService.$queryRaw`
        SELECT 
          e.id, e.option 
        FROM 
          products_orders_extras poe 
        INNER JOIN	extras e  
          ON poe.extra_id  = e.id 
        WHERE 
          poe.order_id = ${order_id} AND poe.product_id = ${product_id}
      `;
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateExtraDto) {
    try {
      return this.prismaService.extra.update({
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
      return this.prismaService.extra.delete({
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
