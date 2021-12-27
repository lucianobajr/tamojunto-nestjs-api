import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserGroups as UserGroupsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('userGroups')
export class UserGroupsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get(':id')
  async findUserGroups(@Param('id') id: number): Promise<UserGroupsModel[]> {
    return await this.prismaService.userGroups.findMany({
      where: { userId: Number(id) },
    });
  }

  @Get('/group/:id')
  async findGroupUser(@Param('id') id: number): Promise<UserGroupsModel[]> {
    return await this.prismaService.userGroups.findMany({
      where: { groupId: Number(id) },
      include: { user: { select: { name: true } } },
    });
  }

  @Post()
  async create(@Body() data: UserGroupsModel): Promise<UserGroupsModel> {
    const { userId, groupId } = data;

    const newUserGroup = await this.prismaService.userGroups.create({
      data: {
        groups: {
          connect: {
            id: groupId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newUserGroup;
  }
}
