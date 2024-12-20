import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/model.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'task' })
  statuse: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;

  @Column()
  status: 'task' | 'in-progress' | 'done';
}
