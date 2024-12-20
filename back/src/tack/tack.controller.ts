// src/tasks/task.controller.ts
import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { TaskService } from './tack.service';
import { Task } from './tack.entity';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post(':userId')
  async createTask(
    @Param('userId') userId: number,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.taskService.createTask(userId, title, description);
  }
  
  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
