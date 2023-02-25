import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('/all-products')
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get('/all-products-with-stock')
  findAllProductWithStock() {
    return this.productsService.findAllProductsWithStock();
  }

  @Get('/product/:id')
  findByCategory(@Param('id') id: string) {
    return this.productsService.findByCategory(id);
  }

  @Get('/product-with-stock/:id')
  findProductWithStockById(@Param('id') id: string) {
    return this.productsService.findProductWithStockById(id);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Patch('/product/:id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }

  @Delete('/product/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
