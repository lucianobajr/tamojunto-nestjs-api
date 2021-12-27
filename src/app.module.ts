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

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    EventsModule,
    MessageModule,
    UserGroupsModule,
    AdminGroupsModule,
  ],
  controllers: [UsersController],
  providers: [PrismaService],
})
export class AppModule {}
