import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


// Create User dto
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional() // Optionnel, par défaut "USER"
  role?: string;
}

// Update User dto

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    password?: string;
  
    @IsString()
    @IsOptional()
    role?: string;
  }



// Login User Dto
export class LoginUserDto {
    email: string;
    password: string;
  }
  

//Register Useer dto  
export class RegisterUserDto {
    email: string;
    password: string;
    role?: string; // Optionnel, par défaut "USER"
  }
  
