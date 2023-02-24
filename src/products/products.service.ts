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
          categoryId: data.categoryId,
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
              is_card: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAllProductsWithStock() {
    try {
      return this.prismaService.$queryRaw`
        SELECT 
          p.bar_code,
          c.is_card,
          c.name AS category_name,
          p.categoryId,
          p.cost,
          p.create_at,
          p.description,
          p.id,
          p.image,
          p.name,
          p.price,
          p.special_card,
          p.unit,
          p.use_card,
          p.validate_stock,
          IFNULL((
            SELECT DISTINCT 
          (SELECT 
            IFNULL(SUM(s.quant),0) 
          FROM 
            stocks s 
          WHERE 
            product_id = s2.product_id  AND s.type = 'IN') - 
          (SELECT 
            IFNULL(SUM(s.quant),0) 
          FROM 
            stocks s 
          WHERE 
              product_id = s2.product_id  AND s.type = 'OUT') AS stock_atual
          FROM 
            stocks s2 
          WHERE 
            s2.product_id = p.id 
          ), 0) AS stock
        FROM 
          products p
        INNER JOIN categories c 
          ON
          c.id = p.categoryId
      `;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  findProductWithStockById(id: string) {
    try {
      return this.prismaService.$queryRaw`
        SELECT 
          p.bar_code,
          c.is_card,
          c.name AS category_name,
          p.categoryId,
          p.cost,
          p.create_at,
          p.description,
          p.id,
          p.image,
          p.name,
          p.price,
          p.special_card,
          p.unit,
          p.use_card,
          p.validate_stock,
          IFNULL((
            SELECT DISTINCT 
          (SELECT 
            IFNULL(SUM(s.quant),0) 
          FROM 
            stocks s 
          WHERE 
            product_id = s2.product_id  AND s.type = 'IN') - 
          (SELECT 
            IFNULL(SUM(s.quant),0) 
          FROM 
            stocks s 
          WHERE 
              product_id = s2.product_id  AND s.type = 'OUT') AS stock_atual
          FROM 
            stocks s2 
          WHERE 
            s2.product_id = p.id 
          ),0) AS stock
        FROM 
          products p
        INNER JOIN categories c 
          ON
          c.id = p.categoryId
        WHERE
            p.id = ${id}
      `;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  findAllProducts() {
    console.log('pass');
    try {
      return this.prismaService.product.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.product.findUnique({
        where: {
          id,
        },
        include: {
          category: {
            select: {
              name: true,
              is_card: true,
            },
          },
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
          use_card: true,
        },
        orderBy: {
          name: 'asc',
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
