import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum TypeService {
  PAYCHECK = 'PAYCHECK',
  HELP = 'HELP',
}

export class CreateCallServiceDto {
  @IsString()
  @IsNotEmpty()
  public client: string;

  @IsString()
  @IsNotEmpty()
  public table: string;

  @IsEnum(TypeService)
  @IsNotEmpty()
  public service: TypeService;

  @IsBoolean()
  @IsNotEmpty()
  public is_done: boolean;
}
