import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(@InjectRepository(Cliente) private readonly repo: Repository<Cliente>){}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cl = this.repo.create(createClienteDto);
    return await this.repo.save(cl);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Cliente> {
      const cl = await this.repo.findOneBy({ id });
      if (!cl) {
        const error = {
          "statusCode": 404,
          "error": "NotFound",
          "message": ["El cliente no esta registrado"] 
        }
        throw new NotFoundException(error);
      }
      return cl;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto):Promise<Cliente> {
    await this.findOne(id);
    
    await this.repo.update(id, updateClienteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const cl = await this.findOne(id);
    await this.repo.remove(cl);
  }
}
