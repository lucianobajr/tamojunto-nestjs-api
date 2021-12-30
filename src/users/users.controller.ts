import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import SendMailProducerService from 'src/jobs/sendMail-producer.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly prismaService: PrismaService,
    private sendMailService: SendMailProducerService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserModel> {
    const { course, name, email, preferences, password } = user;

    const userExists = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exists!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const password_hash = await bcrypt.hash(password, 8);

    const newUser: UserModel = await this.prismaService.user.create({
      data: {
        course,
        name,
        email,
        preferences,
        password_hash,
      },
    });

    return newUser;
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UserModel> {
    const userExists = await this.prismaService.user.findFirst({
      where: { id: Number(id) },
    });

    if (!userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not exists!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
