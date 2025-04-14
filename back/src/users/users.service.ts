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
    // console.error(body.username);
    if (body.username === undefined) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const user = await this.usersRepository.findOne({
      where: {
        username: body.username,
      },
    });
    // console.error(user);
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
  async create(body) {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    const user = this.usersRepository.create({
      ...body,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => plainToInstance(User, user));
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return plainToInstance(User, user);
  }

  async update(id: number, body) {
    console.error(body);
    console.error(id);
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    let updatedUser;
    if (body.password === undefined) {
      updatedUser = await this.usersRepository.save({
        ...user,
        ...body,
      });
    } else {
      const hashedPassword = bcrypt.hashSync(body.password, 10);
      updatedUser = await this.usersRepository.save({
        ...user,
        ...body,
        password: hashedPassword,
      });
    }
    return plainToInstance(User, updatedUser);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    await this.usersRepository.softDelete(id);
    return plainToInstance(User, user);
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
