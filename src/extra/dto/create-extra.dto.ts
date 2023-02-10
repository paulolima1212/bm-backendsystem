import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExtraDto {
  @IsNotEmpty()
  @IsString()
  public option: string;

  @IsNotEmpty()
  @IsString()
  public price: string;
}
