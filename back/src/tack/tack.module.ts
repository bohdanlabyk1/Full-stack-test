// src/tasks/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tack.entity';
import { TaskService } from './tack.service';
import { TaskController } from './tack.controller';
import { User } from 'src/users/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TaskService,],
  controllers: [TaskController],
})
export class TaskModule {}
