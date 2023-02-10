import { Module } from '@nestjs/common';
import { StockProductService } from './stock_product.service';
import { StockProductController } from './stock_product.controller';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StockProductController],
  providers: [StockProductService, PrismaService],
})
export class StockProductModule {}
