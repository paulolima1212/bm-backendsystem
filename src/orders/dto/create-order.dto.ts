import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum PayOption {
  MBWAY = 'MBWAY',
  DINHEIRO = 'DINHEIRO',
}

interface IProductsIdsProps {
  product_id: string;
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public client: string;

  @IsString()
  public nif: string;

  @IsNotEmpty()
  @IsString()
  public table: string;

  @IsNotEmpty()
  @IsEnum(PayOption)
  public payment_method: PayOption;

  @IsNotEmpty()
  @IsNumber()
  public total_pay: number;

  @IsBoolean()
  public status: boolean;

  @IsBoolean()
  public status_payment: boolean;

  @IsNotEmpty()
  @IsArray()
  public products_ids: IProductsIdsProps[];
}
