import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/products-in-orders')
  findProducts() {
    return this.ordersService.findProductsInOrder();
  }

  @Get('/products-in-order-by-id/:id')
  findProductsInOrderById(@Param('id') id: string) {
    return this.ordersService.findProductsInOrderById(id);
  }

  @Get('/all-orders')
  findOrders() {
    return this.ordersService.findOrders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch('/change-products/:id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.ordersService.update(id, data);
  }

  @Patch(':id')
  finishOrder(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.ordersService.finishOrder(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
