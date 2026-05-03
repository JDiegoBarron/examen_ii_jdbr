import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    try {
      const nuevo = this.repo.create({
        descripcion: dto.descripcion,
        precio: dto.precio,
        proveedor: { id: dto.id_proveedor }, 
        categoria: { id: dto.id_categoria }, 
      });
      return await this.repo.save(nuevo);
    } catch (err) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'BadRequest',
        message: ['No se pudo crear el producto. Verifique los IDs de proveedor y categoría.'],
      });
    }
  }

  async findAll(): Promise<Producto[]> {
    return await this.repo.find({
      relations: ['proveedor', 'categoria'],
    });
  }

  async findOne(id: number): Promise<Producto> {
    const prod = await this.repo.findOne({
      where: { id },
      relations: ['proveedor', 'categoria'],
    });

    if (!prod) {
      const error = {
        statusCode: 404,
        error: 'NotFound',
        message: [`El producto con ID ${id} no está registrado`],
      };
      throw new NotFoundException(error);
    }

    return prod;
  }

  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    // Primero validamos si existe usando el método findOne que ya tiene el error 404
    await this.findOne(id);

    try {
      const actualizado = await this.repo.preload({
        id: id,
        ...dto,
      });
      return await this.repo.save(actualizado!);
    } catch (err) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'BadRequest',
        message: ['Error al actualizar. Verifique la integridad de los datos.'],
      });
    }
  }

  async remove(id: number): Promise<void> {
    const prod = await this.findOne(id);
    await this.repo.remove(prod);
  }
}