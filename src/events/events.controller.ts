import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Events as EventsModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('events')
export class EventsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  findAll() {
    return this.prismaService.events.findMany({
      include: { grupo: { select: { title: true } } },
    });
  }

  @Post()
  async create(@Body() event: EventsModel): Promise<EventsModel> {
    const {
      title,
      description,
      more,
      dayOfTheWeekInit,
      dayOfTheWeekEnd,
      place,
      hourInit,
      hourEnd,
      groupsId,
    } = event;

    const newGroup = await this.prismaService.events.create({
      data: {
        title,
        description,
        more,
        dayOfTheWeekInit,
        dayOfTheWeekEnd,
        place,
        hourInit,
        hourEnd,
        grupo: {
          connect: {
            id: groupsId,
          },
        },
      },
    });
    return newGroup;
  }

  @Put(':id')
  async update(
    @Body() event: EventsModel,
    @Param('id') id: number,
  ): Promise<EventsModel> {
    return await this.prismaService.events.update({
      data: event,
      where: { id: Number(id) },
    });
  }
}
