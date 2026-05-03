import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ApiOperation, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { Proveedor } from './entities/proveedor.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  @ApiOperation({summary: 'Registrar un nuevo proveedor'})
  @ApiBody({type: CreateProveedorDto})
  @ApiCreatedResponse({type: Proveedor, description: 'El registro es exitoso'})
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.create(createProveedorDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener una lista con todos los proveedores'})
  @ApiOkResponse({type: [Proveedor], description: 'Lista de proveedores obtenida'})
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener un solo proveedor por su ID'})
  @ApiParam({name: 'id', description: 'ID del proveedor', example: 9})
  @ApiOkResponse({type: Proveedor, description: 'Proveedor encontrado'})
  @ApiNotFoundResponse({description: 'Proveedor no encontrado'})
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor existente' })
  @ApiParam({ name: 'id', description: 'ID del proveedor a modificar', example: 4 })
  @ApiBody({ type: UpdateProveedorDto })
  @ApiOkResponse({type: Proveedor, description: 'Datos de proveedor actualizados exitosamente'})
  @ApiNotFoundResponse({description: 'Proveedor no encontrado'})
  update(@Param('id') id: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    return this.proveedorService.update(+id, updateProveedorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  @ApiParam({ name: 'id', description: 'ID del proveedor a borrar' })
  @ApiOkResponse({type: Proveedor, description: 'Datos de proveedor eliminados exitosamente'})
  @ApiNotFoundResponse({description: 'Proveedor no encontrado'})
  remove(@Param('id') id: string) {
    return this.proveedorService.remove(+id);
  }
}
