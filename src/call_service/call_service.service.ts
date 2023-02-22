import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCallServiceDto } from './dto/create-call_service.dto';
import { UpdateCallServiceDto } from './dto/update-call_service.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CallServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateCallServiceDto) {
    try {
      return this.prismaService.call_Service.create({
        data,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    try {
      return this.prismaService.call_Service.findMany({
        orderBy: {
          create_at: 'desc',
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findNotFinished() {
    try {
      return this.prismaService.call_Service.findMany({
        where: {
          is_done: false,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.call_Service.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateCallServiceDto) {
    try {
      return this.prismaService.call_Service.update({
        where: {
          id,
        },
        data,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.call_Service.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
}
