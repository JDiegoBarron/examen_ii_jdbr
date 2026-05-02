import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @ApiBody({type: LoginUserDto})
    @ApiCreatedResponse({
      description: "Se realizó el inicio de sesión. Regresa el token generado (problemático)",
      schema:{
        example:{
          token: "string"
        }
      }
    })
    @ApiNotFoundResponse({
      description: "El usuario no se encuentra en la base de datos"
    })
    @ApiUnauthorizedResponse({
      description: "La contraseña es incorrecta" 
    })
    @Post('/login')
      login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.loginUser(loginUserDto);
    } 

}
