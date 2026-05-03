import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(@InjectRepository(Categoria) private readonly repo: Repository<Categoria>) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const cat = this.repo.create(createCategoriaDto);
    return await this.repo.save(cat);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.repo.findOneBy({ id });
    if (!categoria) {
      const error = {
        "statusCode": 404,
        "error": "NotFound",
        "message": ["La categoria no existe"] 
      }
      throw new NotFoundException(error);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    await this.findOne(id);
    
    await this.repo.update(id, updateCategoriaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.repo.remove(categoria);
  }
}