import { Module } from '@nestjs/common';

//Services
import { PrismaService } from './prisma.service';

//Modules
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { EventsModule } from './events/events.module';
import { MessageModule } from './message/message.module';
import { UserGroupsModule } from './userGroups/userGroups.module';
import { AdminGroupsModule } from './adminGroups/adminGroups.module';
import { AuthModule } from './auth/auth.module';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import SendMailProducerService from './jobs/sendMail-producer.service';
import { Queue } from 'bull';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareBuilder } from '@nestjs/core';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    GroupsModule,
    EventsModule,
    MessageModule,
    UserGroupsModule,
    AdminGroupsModule,
    AuthModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS,
        },
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [UsersController],
  providers: [PrismaService, SendMailProducerService],
})
export class AppModule {
  constructor(@InjectQueue('sendMail-queue') private sendMailQueue: Queue) {}

  configure(consumer: MiddlewareBuilder) {
    const { router } = createBullBoard([new BullAdapter(this.sendMailQueue)]);
    consumer.apply(router).forRoutes('/admin/queues');
  }
}
