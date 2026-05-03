import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Cliente } from './entities/cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({summary: 'Registrar un nuevo cliente'})
  @ApiBody({type: CreateClienteDto})
  @ApiCreatedResponse({type: Cliente, description: 'El registro es exitoso'})
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener una lista con todos los clientes'})
  @ApiOkResponse({type: [Cliente], description: 'Lista de clientes obtenida'})
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener un solo cliente por su ID'})
  @ApiParam({name: 'id', description: 'ID del cliente', example: 2})
  @ApiOkResponse({type: Cliente, description: 'Cliente encontrado'})
  @ApiNotFoundResponse({description: 'Cliente no encontrado'})
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiParam({ name: 'id', description: 'ID del cliente a modificar', example: 11 })
  @ApiBody({ type: UpdateClienteDto })
  @ApiOkResponse({type: Cliente, description: 'Datos de cliente actualizados exitosamente'})
  @ApiNotFoundResponse({description: 'Cliente no encontrado'})
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente a borrar' })
  @ApiOkResponse({type: Cliente, description: 'Datos de cliente eliminados exitosamente'})
  @ApiNotFoundResponse({description: 'Cliente no encontrado'})
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
