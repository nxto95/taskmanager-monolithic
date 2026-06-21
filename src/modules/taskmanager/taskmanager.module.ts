import { Module } from '@nestjs/common';
import { TaskmanagerService } from './taskmanager.service';
import { TaskmanagerController } from './taskmanager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../common/entites/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskmanagerController],
  providers: [TaskmanagerService],
})
export class TaskmanagerModule {}
