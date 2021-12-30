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
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [PrismaService, SendMailProducerService, SendMailConsumer],
})
export class UsersModule {}
