import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/auth/entities/UserRole';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>){
  }
  
  async create(createUserDto: CreateUserDto) {
    // Desestructurar 
    const numRound = 10

    const {username, password} = createUserDto; 
    // Verificar que el username no existe 
    const usernameExists = await this.repo.findOneBy({username})
    if(usernameExists){
      const error = {
        "statusCode": 409,
        "error": "Conflict",
        "message": ["El username ya existe"] 
      }
      throw new ConflictException(error) 
    }
    // Encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, numRound)
    createUserDto.password = hashPassword; 

    // Guardar en la base de datos 
    return this.repo.save(createUserDto);
  }

  async findAll(id: number, userRole: UserRole) {
    if(userRole == UserRole.ADMIN || userRole == UserRole.DEVELOPER){
      return await this.repo.find();
    }

    const user = await this.repo.findOneBy({id});
    return [user];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOneBy({id});

    await this.repo.update(id, updateUserDto);
    return this.repo.findOneBy({id});
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return `Eliminado usuario con id: #${id}`;
  }
}
