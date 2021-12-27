import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Post()
  async create(@Body() user: UserModel): Promise<UserModel> {
    const { course, name, email, preferences, password_hash } = user;

    const hash = await bcrypt.hash(password_hash, 8);

    const newUser: UserModel = await this.prismaService.user.create({
      data: {
        course,
        name,
        email,
        preferences,
        password_hash: hash,
      },
    });

    return newUser;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: UserModel,
  ): Promise<UserModel> {
    return await this.prismaService.user.update({
      data,
      where: { id: Number(id) },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UserModel> {
    return await this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
