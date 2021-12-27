import { Body, Controller, Get, Post } from '@nestjs/common';
import { Groups as GroupsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GroupsModule } from './groups.module';

@Controller('groups')
export class GroupsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll(): Promise<GroupsModel[]> {
    return this.prismaService.groups.findMany();
  }

  @Post()
  async create(@Body() group: GroupsModel): Promise<GroupsModule> {
    const { title, description, adminCreateUserId } = group;

    const newGroup = await this.prismaService.groups.create({
      data: {
        title,
        description,
        adminCreatedUser: { connect: { id: adminCreateUserId } },
      },
    });

    await this.prismaService.userGroups.create({
      data: {
        groups: {
          connect: {
            id: newGroup.id,
          },
        },
        user: {
          connect: {
            id: adminCreateUserId,
          },
        },
      },
    });

    await this.prismaService.adminGroups.create({
      data: {
        groups: {
          connect: {
            id: newGroup.id,
          },
        },
        admin: {
          connect: {
            id: adminCreateUserId,
          },
        },
      },
    });

    return newGroup;
  }
}
