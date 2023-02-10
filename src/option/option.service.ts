import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateOptionDto) {
    try{
      return this.prismaService.option.create({
        data,
      });
    }catch(err){
      console.log(err)
      throw new InternalServerErrorException(err)
    }
  }

  findAll() {
    return this.prismaService.option.findMany();
  }

  findOne(id: string) {
    try {
      return this.prismaService.option.findFirstOrThrow({
        where: { id },
      });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err);
    }
  }

  update(id: string, data: UpdateOptionDto) {
    try{
      return this.prismaService.option.update({
        where: {
          id,
        },
        data,
      });
    }catch(err){
      console.log(err)
      throw new InternalServerErrorException(err)
    }
  }

  remove(id: string) {
    try{
      return this.prismaService.option.delete({
        where: {
          id,
        },
      });
    }catch(err){
      console.log(err)
      throw new IntersectionObserver(err)
    }
  }
}
