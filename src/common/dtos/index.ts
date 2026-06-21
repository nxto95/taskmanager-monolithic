import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @Length(2, 64)
  username?: string = `user-${Date.now()}`;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  description: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
