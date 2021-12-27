import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GroupsController } from './groups.controller';

@Module({
  controllers: [GroupsController],
  providers: [PrismaService],
})
export class GroupsModule {}
