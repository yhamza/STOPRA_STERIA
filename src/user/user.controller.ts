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
import { JwtAuthGuard } from '../guards/JwtAuth.Guard'; // Corrected import name

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe()) 
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login') 
  @UsePipes(new ValidationPipe()) 
  async login(@Body() params: LoginUserDto, @Res() res: Response) {
    return this.userService.login(params, res);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)  // Utilisez JwtAuthGuard, pas JwtStrategy
  @Get('profile')
  @Roles(Role.ADMIN)  // Assurez-vous que Role.ADMIN est bien défini
  async profile(@Req() req: any) {  
    return req.user;  // Renvoie l'objet utilisateur du token JWT
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