import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Venta } from './entities/venta.entity';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  @ApiOperation({summary: 'Registrar una nueva venta'})
  @ApiBody({type: CreateVentaDto})
  @ApiCreatedResponse({type: Venta, description: 'El registro es exitoso'})
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener una lista con todas las ventas'})
  @ApiOkResponse({type: [Venta], description: 'Lista de ventas obtenida'})
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener una sola venta por su ID'})
  @ApiParam({name: 'id', description: 'ID de la venta', example: 1})
  @ApiOkResponse({type: Venta, description: 'Venta encontrada'})
  @ApiNotFoundResponse({description: 'Venta no encontrada'})
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una venta existente' })
  @ApiParam({ name: 'id', description: 'ID de la venta a modificar', example: 1 })
  @ApiBody({ type: UpdateVentaDto })
  @ApiOkResponse({type: Venta, description: 'Datos de venta actualizados exitosamente'})
  @ApiNotFoundResponse({description: 'Venta no encontrada'})
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta' })
  @ApiParam({ name: 'id', description: 'ID de la venta a borrar' })
  @ApiOkResponse({type: Venta, description: 'Datos de venta eliminados exitosamente'})
  @ApiNotFoundResponse({description: 'Venta no encontrado'})
  remove(@Param('id') id: string) {
    return this.ventaService.remove(+id);
  }
}
