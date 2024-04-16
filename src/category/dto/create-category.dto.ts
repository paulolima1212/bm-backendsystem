import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;

  @IsString()
  public option_id: string;

  @IsString()
  public extra_id: string;

  @IsNotEmpty()
  @IsBoolean()
  public is_card: boolean;
}
