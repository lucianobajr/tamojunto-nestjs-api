import { User } from '@prisma/client';

export class LoginDto {
  user: User;
  token: string;
}
