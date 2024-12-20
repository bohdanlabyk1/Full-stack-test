import { Module } from '@nestjs/common';
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { TaskModule } from './tack/tack.module';
import { PlaymentModule } from './playment/playment.module';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    TaskModule,
    PlaymentModule,
  ],
  
})
export class AppModule {}
