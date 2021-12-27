import { Module } from '@nestjs/common';
import { UserGroupsController } from './userGroups.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserGroupsController],
  providers: [PrismaService],
})
export class UserGroupsModule {}
