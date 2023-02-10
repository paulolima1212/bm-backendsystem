import { PartialType } from '@nestjs/mapped-types';
import { CreateCallServiceDto } from './create-call_service.dto';

export class UpdateCallServiceDto extends PartialType(CreateCallServiceDto) {}
