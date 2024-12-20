import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Реєстрація користувача
  @Post('register')
  async register(@Body() body: { email: string, password: string, username: string }) {
    const { email, password, username } = body;

    // Перевірка, чи існує вже користувач з таким email
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Користувач з таким email вже існує');
    }

    // Хешування паролю
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });

    // Збереження користувача в базі даних
    await this.userRepository.save(user);

    return { message: 'Реєстрація успішна!' };
  }

  // Авторизація користувача
  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;

    // Перевірка, чи існує користувач з таким email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неправильний логін або пароль');
    }

    return { message: 'Авторизація успішна!' };
  }
}
