import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tack/tack.entity';
import { User } from 'src/users/model.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: '12345', 
      database: 'dashbord',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Task], 
    }),
    TypeOrmModule.forFeature([User, Task]),
  ],
})
export class DatabaseModule {}
