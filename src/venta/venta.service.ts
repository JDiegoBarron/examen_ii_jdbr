import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly repo: Repository<Venta>,
  ) {}

  async create(dto: CreateVentaDto): Promise<Venta> {
    try {
      const nuevo = this.repo.create({
        cantidad: dto.cantidad,
        producto: {id: dto.id_producto},
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

  async findAll(): Promise<Venta[]> {
    return await this.repo.find({
      relations: ['factura', 'producto'],
    });
  }

  async findOne(id: number): Promise<Venta> {
    const prod = await this.repo.findOne({
      where: { id },
      relations: ['factura', 'producto'],
    });

    if (!prod) {
      const error = {
        statusCode: 404,
        error: 'NotFound',
        message: [`La venta con ID ${id} no está registrado`],
      };
      throw new NotFoundException(error);
    }

    return prod;
  }

  async update(id: number, dto: UpdateVentaDto): Promise<Venta> {
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
