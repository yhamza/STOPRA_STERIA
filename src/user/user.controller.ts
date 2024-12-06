import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Res, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';

// Dtos
import { CreateUserDto } from '../database/dto/user/User.dto';
import { UpdateUserDto } from '../database/dto/user/User.dto';
import { LoginUserDto } from '../database/dto/user/User.dto';
import { RegisterUserDto } from '../database/dto/user/User.dto';

// Role guards
import { RolesGuard } from '../guards/Roles.Guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

// Jwt guards
import { JwtAuthGuard } from '../guards/JwtAuth.Guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //create user
  @Post()  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN) 
  @UsePipes(new ValidationPipe()) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //login
  @Post('login') 
  @UsePipes(new ValidationPipe()) 
  async login(@Body() params: LoginUserDto, @Res() res: Response) {
    return this.userService.login(params, res);
  }


  //get profile
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.ADMIN||Role.USER) 
  @Get('profile')
  async profile(@Req() req: any) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token non fourni ou format incorrect');
    }
    const token = authHeader.split(' ')[1]; 
    return {
      user: req.user, 
      token, 
    };
  }
  
  //logout
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN||Role.USER)
  @Get('logout/:userId')
  async logout(@Query () userId : string) {
    return this.userService.logout(userId);
    }
  
  
  
  
  
  
  
  
  
  
  @Get()
  @UseGuards(JwtAuthGuard) // Protect findAll route
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protect findOne route
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Protect update route
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protect delete route
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  } 
}