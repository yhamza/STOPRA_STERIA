import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from '../database/entities/auth.entity';
import { UserEntity } from '../database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';  // Importez PassportModule
import { JwtStrategy } from './jwt.strategy';  // Importez la stratégie JWT

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]), // Enregistrez les entités ici
    TypeOrmModule.forFeature([UserEntity]), // Enregistrez les entités ici
    
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'haqolghl5357df4s56djxnjhbvxqs454qs45qs',
      signOptions: { expiresIn: process.env.SECRET_KEY_EXPIRE_IN || '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Enregistrez PassportModule avec 'jwt' comme stratégie par défaut
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  // Enregistrez JwtStrategy dans les providers
  exports: [AuthService],
})
export class AuthModule {}
