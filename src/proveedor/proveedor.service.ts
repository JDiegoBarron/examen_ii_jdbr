import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {
  constructor(@InjectRepository(Proveedor) private readonly repo: Repository<Proveedor>){}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const pr = this.repo.create(createProveedorDto);
    return await this.repo.save(pr);
  }

  async findAll(): Promise<Proveedor[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Proveedor> {
      const pr = await this.repo.findOneBy({ id });
      if (!pr) {
        const error = {
          "statusCode": 404,
          "error": "NotFound",
          "message": ["El Proveedor no esta registrado"] 
        }
        throw new NotFoundException(error);
      }
      return pr;
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto):Promise<Proveedor> {
    await this.findOne(id);
    
    await this.repo.update(id, updateProveedorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const pr = await this.findOne(id);
    await this.repo.remove(pr);
  }
}
