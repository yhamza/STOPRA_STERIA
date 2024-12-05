import { Controller, Post, Get, Body, UseGuards, Req, Query, HttpException, HttpStatus, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginUserDto } from 'src/database/dto/user/User.dto';





@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

@Get('login')
@UsePipes(new ValidationPipe()) 
async login(@Query() params: LoginUserDto, @Res() res: Response): Promise<void> {
    try {
      this.authService.login(params,res)
    } catch (err) {
      console.error('Error during login:', err);
      throw (err)
    }
  }







}
