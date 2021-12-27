import { Body, Controller, Get, Post } from '@nestjs/common';
import { Message as MessageModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('message')
export class MessageController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get()
  async findAll(): Promise<MessageModel[]> {
    return await this.prismaService.message.findMany();
  }

  @Post()
  async create(@Body() data: MessageModel): Promise<MessageModel> {
    const { content, userId, groupsId } = data;

    const newMessage = await this.prismaService.message.create({
      data: {
        content,
        user: { connect: { id: userId } },
        group: { connect: { id: groupsId } },
      },
    });

    return newMessage;
  }
}
