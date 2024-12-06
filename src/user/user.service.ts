import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  private   url = process.env.URL || 'http://localhost:3000/api/v1';
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly httpService: HttpService
  ) {}

  // Création d'un utilisateur
  async create(params: Partial<UserEntity>) {
    try {
      const user = this.userRepository.create(params);
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  // Trouver un utilisateur par son ID
  async findOne(id: any ): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  // Trouver tous les utilisateurs
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      throw err;
    }
  }

  // Mise à jour d'un utilisateur
  async update(id: number, params: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const user = await this.findOne(id); // Vérifier que l'utilisateur existe
      Object.assign(user, params); // Appliquer les changements
      return await this.userRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  // Suppression d'un utilisateur
  async remove(id: number): Promise<void> {
    try {
      const user = await this.findOne(id); // Vérifier que l'utilisateur existe
      await this.userRepository.remove(user);
    } catch (err) {
      throw err;
    }
  }

  //logout
  async logout(userId: string): Promise<void> {
    try {
       await this.httpService
        .get(`${this.url}/setCaches/${userId}`)
        .toPromise();
    } catch (err) {throw err;}
}

  
  // Méthode de connexion
  async login(params: any, res: any) {
    try {      
      const query = new URLSearchParams(params).toString();
      // Redirige vers l'URL avec les paramètres ajoutés
       res.redirect(`http://localhost:3000/auth/login?${query}`);
    } catch (err) {
      throw err;
    }
  }


  // profile
  async profile(token,res){

  }




  
}