import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExtraService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateExtraDto) {
    try {
      return this.prismaService.extra.create({
        data,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    try {
      return this.prismaService.extra.findMany();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.extra.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateExtraDto) {
    try {
      return this.prismaService.extra.update({
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
      return this.prismaService.extra.delete({
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
