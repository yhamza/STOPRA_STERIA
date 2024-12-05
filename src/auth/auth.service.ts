import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//import entities
import { UserEntity } from '../database/entities/user.entity';
import { AuthEntity } from '../database/entities/auth.entity';

import { CreateUserDto } from '../database/dto/user/User.dto';
import { UpdateUserDto } from '../database/dto/user/User.dto';
import { LoginUserDto } from '../database/dto/user/User.dto';
import { RegisterUserDto } from '../database/dto/user/User.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async create(params: Partial<UserEntity>) {
    try {
      
      const user = this.userRepository.create(params);
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

  async login(params: LoginUserDto, res: any) {
    try {
      if (Object.keys(params).length === 0) {
        throw new UnauthorizedException('Invalid credentazials');
      }
      const user = await this.userRepository.findOne({ where: { email: params.email , password: params.password } });
      if (!user ) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = this.jwtService.sign({ id: user.id });
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' , error :error });
    }
  }












}