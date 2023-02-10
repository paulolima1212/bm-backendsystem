import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockProductService } from './stock_product.service';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('stock-products')
export class StockProductController {
  constructor(private readonly stockProductService: StockProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createStockProductDto: CreateStockProductDto) {
    return this.stockProductService.create(createStockProductDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.stockProductService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateStockProductDto: UpdateStockProductDto,
  ) {
    return this.stockProductService.update(id, updateStockProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.stockProductService.remove(id);
  }
}
