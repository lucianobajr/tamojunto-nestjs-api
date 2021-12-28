import { IsString, IsNotEmpty, IsEmail, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  course: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsArray()
  preferences: string[];
}
