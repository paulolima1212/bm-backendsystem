import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CallServiceService } from './call_service.service';
import { CreateCallServiceDto } from './dto/create-call_service.dto';
import { UpdateCallServiceDto } from './dto/update-call_service.dto';

@Controller('call-service')
export class CallServiceController {
  constructor(private readonly callServiceService: CallServiceService) {}

  @Post()
  create(@Body() createCallServiceDto: CreateCallServiceDto) {
    return this.callServiceService.create(createCallServiceDto);
  }

  @Get()
  findAll() {
    return this.callServiceService.findAll();
  }

  @Get('/calls-not-finished')
  findCallsNotFinished() {
    return this.callServiceService.findNotFinished();
  }

  @Get('/call/:id')
  findOne(@Param('id') id: string) {
    return this.callServiceService.findOne(id);
  }

  @Patch('/call/:id')
  update(
    @Param('id') id: string,
    @Body() updateCallServiceDto: UpdateCallServiceDto,
  ) {
    return this.callServiceService.update(id, updateCallServiceDto);
  }

  @Delete('/call:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.callServiceService.remove(id);
  }
}
