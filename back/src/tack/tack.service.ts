// src/tasks/task.service.ts
import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tack.entity';
import { User } from 'src/users/model.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    @InjectRepository(User) private userRepository: Repository<User>,
    private taskRepository: Repository<Task>,
  ) {}

  // Отримати всі задачі
  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async createTask(userId: number, title: string, description: string): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) throw new BadRequestException('Користувач не знайдений.');
  
    // Дозволяємо створювати необмежену кількість задач, якщо є преміум
    if (!user.isPremium && user.taskCount >= 2) {
      throw new BadRequestException('Ви досягли ліміту задач. Оформіть преміум.');
    }
  
    const task = this.taskRepository.create({ title, description, user });
    await this.taskRepository.save(task);
  
    user.taskCount++;
    await this.userRepository.save(user);
  
    return task;
  }
  // Видалити задачу
  deleteTask(id: number): Promise<void> {
    return this.taskRepository.delete(id).then(() => {});
  }
}
