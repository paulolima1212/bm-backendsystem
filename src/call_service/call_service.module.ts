import { Module } from '@nestjs/common';
import { CallServiceService } from './call_service.service';
import { CallServiceController } from './call_service.controller';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CallServiceController],
  providers: [CallServiceService, PrismaService],
})
export class CallServiceModule {}
