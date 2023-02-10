import { IsNotEmpty, IsString } from 'class-validator';
import { IsBoolean, IsEnum, IsNumber } from 'class-validator';

enum ProductUnit {
  UN = 'UN',
  KG = 'KG',
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number;

  @IsNotEmpty()
  @IsNumber()
  public cost: number;

  @IsNotEmpty()
  @IsEnum(ProductUnit)
  public unit: ProductUnit;

  @IsNotEmpty()
  @IsString()
  public bar_code: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;

  @IsNotEmpty()
  @IsBoolean()
  public validate_stock: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public use_card: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public special_card: boolean;

  @IsNotEmpty()
  @IsString()
  public categorie_id: string;
}
