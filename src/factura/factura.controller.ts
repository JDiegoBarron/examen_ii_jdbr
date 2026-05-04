import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe, HttpCode, HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from './entities/factura.entity';

@ApiTags('Facturas')
@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiResponse({ status: 201, type: Factura })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() dto: CreateFacturaDto): Promise<Factura> {
    return this.facturaService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiResponse({ status: 200, type: [Factura] })
  findAll(): Promise<Factura[]> {
    return this.facturaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por ID' })
  @ApiResponse({ status: 200, type: Factura })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Factura> {
    return this.facturaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una factura existente' })
  @ApiResponse({ status: 200, type: Factura })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFacturaDto
  ): Promise<Factura> {
    return this.facturaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura' })
  @ApiResponse({ status: 204, description: 'Factura eliminada' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.facturaService.remove(id);
  }
}