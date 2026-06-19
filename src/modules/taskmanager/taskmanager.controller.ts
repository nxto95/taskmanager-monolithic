import { Controller } from '@nestjs/common';
import { TaskmanagerService } from './taskmanager.service';

@Controller('taskmanager')
export class TaskmanagerController {
  constructor(private readonly taskmanagerService: TaskmanagerService) {}
}
