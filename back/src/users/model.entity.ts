import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './../tack/tack.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  taskCount: number;

  @Column({ default: false })
  isPremium: boolean;
  
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
