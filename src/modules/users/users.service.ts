import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entites/users.entity';
import { CreateUserDto } from '../../common/dtos';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hash = await argon2.hash(dto.password);
    const user = this.usersRepo.create({ ...dto, password: hash });
    return this.usersRepo.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async getAuthUser(email: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  private logError(action: string, error: unknown): void {
    if (error instanceof Error) {
      this.logger.error(`${action}: ${error.message}`, error.stack);
    } else {
      this.logger.error(`${action}: ${String(error)}`);
    }
  }
}
