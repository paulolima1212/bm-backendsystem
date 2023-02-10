import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockProductDto {
  @IsNotEmpty()
  @IsNumber()
  public quant: number;

  @IsNotEmpty()
  @IsString()
  public product_id: string;
}
