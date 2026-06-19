import { Module } from '@nestjs/common';
import { TaskmanagerService } from './taskmanager.service';
import { TaskmanagerController } from './taskmanager.controller';

@Module({
  controllers: [TaskmanagerController],
  providers: [TaskmanagerService],
})
export class TaskmanagerModule {}
