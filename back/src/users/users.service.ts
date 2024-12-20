import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './model.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Реєстрація
  async register(email: string, username: string, password: string, confirmPassword: string): Promise<User> {
    // Перевірка чи співпадають паролі
    if (password !== confirmPassword) {
      throw new HttpException('Паролі не співпадають', HttpStatus.BAD_REQUEST);
    }

    // Перевірка чи вже є користувач з таким email
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('Користувач з таким email вже існує', HttpStatus.BAD_REQUEST);
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // Авторизація
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Користувач не знайдений', HttpStatus.NOT_FOUND);
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Невірний пароль', HttpStatus.BAD_REQUEST);
    }

    // Генерація токену (приклад)
    const token = this.generateJwtToken(user);

    return { user, token };
  }

  // Генерація JWT токену (можна зробити більш комплексно)
  private generateJwtToken(user: User): string {
    // Для реального проекту слід використовувати JwtService
    const payload = { email: user.email, username: user.username };
    return 'jwt_token_example';  // Замість цього генеруйте реальний токен
  }
}