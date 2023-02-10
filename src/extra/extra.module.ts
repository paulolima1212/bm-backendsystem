import { Module } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { ExtraController } from './extra.controller';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ExtraController],
  providers: [ExtraService, PrismaService],
})
export class ExtraModule {}
