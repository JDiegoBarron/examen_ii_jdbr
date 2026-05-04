import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from 'src/auth/entities/UserRole';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decoradores/roles.decorator';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({type: CreateUserDto})
  @ApiCreatedResponse({
    type: User, 
    description: "El registro es exitoso, y se creo en la base de datos. Regresa el usuario creado, con la contraseña hash y el ID (problemático)"
  })
  @ApiBadRequestResponse({
    description: "Falta algún campo, el email no tiene formato correcto o la contraseña no tiene mínimo 8 caracteres"
  })
  @ApiConflictResponse({
    description: "El correo ya existe en la base de datos"
  })
  @Post()
  @UseGuards(AuthGuard, RolesGuard) 
  @Roles(UserRole.DEVELOPER)
    create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard) 
  @Roles(UserRole.DEVELOPER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)  
  @Roles(UserRole.DEVELOPER, UserRole.ADMIN, UserRole.USER)
  findAll(@Request() req) {
    return this.userService.findAll(req.user.sub, req.user.role);
  }
}
