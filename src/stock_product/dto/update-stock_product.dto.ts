import { PartialType } from '@nestjs/mapped-types';
import { CreateStockProductDto } from './create-stock_product.dto';

export class UpdateStockProductDto extends PartialType(CreateStockProductDto) {}
