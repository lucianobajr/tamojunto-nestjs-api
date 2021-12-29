import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import SendMailConsumer from 'src/jobs/sendMail-consumer';
import SendMailProducerService from 'src/jobs/sendMail-producer.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [UsersController],
  providers: [PrismaService, SendMailProducerService, SendMailConsumer],
})
export class UsersModule {}
