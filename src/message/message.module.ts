import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MessageController],
  providers: [PrismaService],
})
export class MessageModule {}
