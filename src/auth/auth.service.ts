import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
  private jwtService: JwtService){
  }

  async generateToken(user: User) {
    const payload = { 
      sub: user.id,
      username: user.username, 
      role: user.role
    };

    return {
      accesToken: this.jwtService.sign(payload),
    };
  }

  async loginUser(loginUserDto:LoginUserDto) {
    const {username, password } = loginUserDto;
    const user = await this.repo.findOneBy({username})

    if(!user){
      const error={
        "message":["Usuario no encontrado"], 
        "error":"No autorizado", 
        "statusCode":403
      }
      throw new UnauthorizedException(error);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch){
      const error={
        "message":["Clave incorrecta"], 
        "error":"No autorizado", 
        "statusCode":403
      }
      throw new UnauthorizedException(error);
    }

    return this.generateToken(user);
  }

  //Metodo que revisa si la solicitud trae o no el Token
  private extractTokenFromHeader(request:Request){
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type==='Bearer' ? token : undefined;

  }

}
