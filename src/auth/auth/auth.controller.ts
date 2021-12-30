import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthDto): Promise<LoginDto> {
    const token = await this.authService.login(body);
    let user: User;

    if (!!token) {
      user = await this.prismaService.user.findFirst({
        where: { email: body.email },
      });
    }

    return { user, token };
  }
}
