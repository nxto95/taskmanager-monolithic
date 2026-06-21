import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../common/entites/tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../../common/dtos';

@Injectable()
export class TaskmanagerService {
  private readonly logger = new Logger(TaskmanagerService.name);
  constructor(
    @InjectRepository(Task) private readonly tasksRepo: Repository<Task>,
  ) {}

  async create(userId: string, dto: CreateTaskDto) {
    try {
      const newTask = this.tasksRepo.create({
        ...dto,
        user: {
          id: userId,
        },
      });
      return await this.tasksRepo.save(newTask);
    } catch (error) {
      this.logError(`Failed to create task for user: ${userId}`, error);
      throw error;
    }
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    try {
      const result = await this.tasksRepo.update(
        {
          id: taskId,
          user: {
            id: userId,
          },
        },
        dto,
      );
      if (result.affected === 0)
        throw new NotFoundException(
          'task not found or you are not allowed to update it',
        );
    } catch (error) {
      this.logError(`Failed to update task for user: ${userId}`, error);
      throw error;
    }
  }
  async softDelete(userId: string, taskId: string) {
    try {
      const result = await this.tasksRepo.softDelete({
        id: taskId,
        user: {
          id: userId,
        },
      });
      if (result.affected === 0)
        throw new NotFoundException(
          'task not found or you are not allowed to delete it',
        );
    } catch (error) {
      this.logError(`Failed to soft delete task for user: ${userId}`, error);
      throw error;
    }
  }
  async hardDelete(userId: string, taskId: string) {
    try {
      const result = await this.tasksRepo.delete({
        id: taskId,
        user: {
          id: userId,
        },
      });
      if (result.affected === 0)
        throw new NotFoundException(
          'task not found or you are not allowed to delete it',
        );
    } catch (error) {
      this.logError(`Failed to delete task for user: ${userId}`, error);
      throw error;
    }
  }
  async restore(userId: string, taskId: string) {
    try {
      const result = await this.tasksRepo.restore({
        id: taskId,
        user: {
          id: userId,
        },
      });
      if (result.affected === 0)
        throw new NotFoundException(
          'task not found or you are not allowed to restore it',
        );
    } catch (error) {
      this.logError(`Failed to restore task for user: ${userId}`, error);
      throw error;
    }
  }
  async getAll(userId: string) {
    try {
      return await this.tasksRepo.find({
        where: {
          user: {
            id: userId,
          },
        },
      });
    } catch (error) {
      this.logError(`Failed to retrieve all tasks for user: ${userId}`, error);
      throw error;
    }
  }
  async getOne(userId: string, taskId: string) {
    try {
      const task = await this.tasksRepo.findOne({
        where: {
          id: taskId,
          user: {
            id: userId,
          },
        },
      });
      if (!task) throw new NotFoundException('task not found');
      return task;
    } catch (error) {
      this.logError(`Failed to retrieve task for user: ${userId}`, error);
      throw error;
    }
  }

  private logError(action: string, error: unknown) {
    if (error instanceof Error) {
      this.logger.error(`${action}: ${error.message}`, error.stack);
    } else {
      this.logger.error(`${action}: ${String(error)}`);
    }
  }
}
