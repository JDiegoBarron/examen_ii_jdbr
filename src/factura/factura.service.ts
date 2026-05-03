import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { Venta } from '../venta/entities/venta.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
    @InjectRepository(Venta)
    private readonly ventaRepo: Repository<Venta>
  ) {}

  async create(dto: CreateFacturaDto): Promise<Factura> {
    // 1. Validar que vengan ventas
    if (!dto.ids_ventas || dto.ids_ventas.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["Debe incluir al menos una venta para generar una factura."]
      });
    }

    // 2. Verificar que las ventas existan y estén libres
    const ventas = await this.ventaRepo.find({
      where: { id: In(dto.ids_ventas) },
      relations: ['factura']
    });

    if (ventas.length !== dto.ids_ventas.length) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["Una o más ventas no existen."]
      });
    }

    const ventasOcupadas = ventas.filter(v => v.factura !== null);
    if (ventasOcupadas.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["Una o más ventas ya están asociadas a otra factura."]
      });
    }

    try {
      // 3. Crear y guardar la factura con las relaciones correctas
      const factura = this.facturaRepo.create({
        cliente: { id: dto.id_cliente },
        ventas: ventas
      });

      const guardada = await this.facturaRepo.save(factura);
      return this.findOne(guardada.id);

    } catch (err) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["No se pudo generar la factura. Verifique los IDs."]
      });
    }
  }

  async findAll(): Promise<Factura[]> {
    return await this.facturaRepo.find({
      relations: ['cliente', 'ventas']
    });
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepo.findOne({
      where: { id },
      relations: ['cliente', 'ventas']
    });

    if (!factura) {
      throw new NotFoundException({
        statusCode: 404,
        error: "NotFound",
        message: [`La factura con ID ${id} no existe`]
      });
    }

    return factura;
  }
  
  async update(id: number, dto: UpdateFacturaDto): Promise<Factura> {
  const factura = await this.facturaRepo.findOne({
    where: { id },
    relations: ['ventas', 'cliente']
  });

  if (!factura) {
    throw new NotFoundException({
      statusCode: 404,
      error: "NotFound",
      message: [`Factura con id ${id} no encontrada.`]
    });
  }

  // 2. Si se actualizan ventas
  if (dto.ids_ventas !== undefined) {
    if (dto.ids_ventas.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["La factura debe tener al menos una venta."]
      });
    }

    const ventas = await this.ventaRepo.find({
      where: { id: In(dto.ids_ventas) },
      relations: ['factura']
    });

    if (ventas.length !== dto.ids_ventas.length) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["Una o más ventas no existen."]
      });
    }

    // Ventas ocupadas por OTRA factura (no la actual)
    const ventasOcupadas = ventas.filter(
      v => v.factura !== null && v.factura.id !== id
    );
    if (ventasOcupadas.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: "BadRequest",
        message: ["Una o más ventas ya están asociadas a otra factura."]
      });
    }

    factura.ventas = ventas;
  }

  // 3. Si se actualiza el cliente
  if (dto.id_cliente !== undefined) {
    factura.cliente = { id: dto.id_cliente } as Cliente;
  }

  try {
    const guardada = await this.facturaRepo.save(factura);
    return this.findOne(guardada.id);
  } catch (err) {
    throw new BadRequestException({
      statusCode: 400,
      error: "BadRequest",
      message: ["No se pudo actualizar la factura. Verifique los IDs."]
    });
  }
}

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    await this.facturaRepo.remove(factura);
  }
}