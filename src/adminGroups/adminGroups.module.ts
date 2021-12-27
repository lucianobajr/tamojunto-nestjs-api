import { Module } from '@nestjs/common';
import { AdminGroupsController } from './adminGroups.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdminGroupsController],
  providers: [PrismaService],
})
export class AdminGroupsModule {}
