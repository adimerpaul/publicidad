import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(body) {
    const user = await this.usersRepository.findOne({
      where: {
        username: body.username,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const payload = {
      username: user.username,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    const userPayload = plainToInstance(User, user);
    return { token, user: userPayload };
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async migracion() {
    await this.usersRepository.query('TRUNCATE TABLE users');
    const hashedPassword = bcrypt.hashSync('123456', 10);
    const users = [
      {
        name: 'ING. ADIMER PAUL CHAMBI AJATA',
        username: 'Adimer',
        role: 'Admin',
      },
    ];
    await this.usersRepository.save(
      users.map((user) => ({
        ...user,
        password: hashedPassword,
      })),
    );
  }
}
