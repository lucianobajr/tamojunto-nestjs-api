import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Post()
  async create(@Body() user: UserModel): Promise<UserModel> {
    const newUser: UserModel = await this.prismaService.user.create({ data: user });

    return newUser;
  }

  @Put(":id")
  async updateUser(@Param('id') id: number, @Body() data: UserModel): Promise<UserModel> {
    return await this.prismaService.user.update({ data, where: { id:Number(id) } })
  }


  @Delete(":email")
  async delete(@Param('email') email: string): Promise<UserModel> {
    return await this.prismaService.user.delete({ where: { email } });
  }
}
