import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum TypeStockInput {
  IN = 'IN',
  OUT = 'OUT',
}

export class CreateStockProductDto {
  @IsNotEmpty()
  @IsNumber()
  public quant: number;

  @IsNotEmpty()
  @IsString()
  public product_id: string;

  @IsNotEmpty()
  @IsString()
  public type: TypeStockInput;
}
