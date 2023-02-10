import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateProductDto) {
    try {
      return this.prismaService.product.create({
        data: {
          name: data.name,
          price: data.price,
          bar_code: data.bar_code,
          categoryId: data.categorie_id,
          cost: data.cost,
          description: data.description,
          image: data.image,
          validate_stock: data.validate_stock,
          special_card: data.special_card,
          use_card: data.use_card,
          unit: data.unit,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    try {
      return this.prismaService.product.findMany({
        include: {
          category: {
            select: {
              name: true,
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
      return this.prismaService.product.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  findByCategory(id: string) {
    try {
      return this.prismaService.product.findMany({
        where: {
          categoryId: id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return this.prismaService.product.update({
        where: {
          id,
        },
        data: updateProductDto,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.product.delete({
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
