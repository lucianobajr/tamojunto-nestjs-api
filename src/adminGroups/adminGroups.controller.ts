import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminGroups as AdminGroupsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('adminGroups')
export class AdminGroupsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/admins/:id')
  async findAllAdmins(@Param('id') id: number): Promise<AdminGroupsModel[]> {
    const users = await this.prismaService.adminGroups.findMany({
      where: { groupId: Number(id) },
      include: { admin: true },
    });

    return users;
  }

  @Post()
  async create(@Body() data: AdminGroupsModel): Promise<AdminGroupsModel> {
    const { adminId, groupId } = data;

    const newAdminGroup = await this.prismaService.adminGroups.create({
      data: {
        groups: {
          connect: {
            id: groupId,
          },
        },
        admin: {
          connect: {
            id: adminId,
          },
        },
      },
    });

    return newAdminGroup;
  }
}
