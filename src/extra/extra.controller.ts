import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ExtraService } from './extra.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';

interface QueryProps {
  order_id: string;
  product_id: string;
}

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Body() createExtraDto: CreateExtraDto) {
    return this.extraService.create(createExtraDto);
  }

  @Get()
  findAll() {
    return this.extraService.findAll();
  }

  @Get('/extras')
  findOne(@Query() query: QueryProps) {
    return this.extraService.findOne(query.order_id, query.product_id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateExtraDto: UpdateExtraDto,
  ) {
    return this.extraService.update(id, updateExtraDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.extraService.remove(id);
  }
}
