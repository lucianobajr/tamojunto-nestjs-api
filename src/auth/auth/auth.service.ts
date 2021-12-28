import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(auth: AuthDto): Promise<string> {
    const user = await this.validateCredentials(auth);

    const payload = {
      sub: user.id,
      user: user,
    };

    return this.jwtService.sign(payload);
  }

  async validateCredentials(auth: AuthDto): Promise<UserModel> {
    const user = await this.prismaService.user.findUnique({
      where: { email: auth.email },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    if (!bcrypt.compare(auth.password, user.password_hash)) {
      throw new Error('Passwords not matchs!');
    }

    return user;
  }
}
