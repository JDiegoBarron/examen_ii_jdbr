import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiOperation({summary: 'Registrar un nuevo producto'})
  @ApiBody({type: CreateProductoDto})
  @ApiCreatedResponse({type: Producto, description: 'El registro es exitoso'})
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({summary: 'Obtener una lista con todos los producto'})
  @ApiOkResponse({type: [Producto], description: 'Lista de productos obtenida'})
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener un solo producto por su ID'})
  @ApiParam({name: 'id', description: 'ID del producto', example: 14})
  @ApiOkResponse({type: Producto, description: 'Producto encontrado'})
  @ApiNotFoundResponse({description: 'Producto no encontrado'})
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', description: 'ID del producto a modificar', example: 99 })
  @ApiBody({ type: UpdateProductoDto })
  @ApiOkResponse({type: Producto, description: 'Datos de producto actualizados exitosamente'})
  @ApiNotFoundResponse({description: 'Producto no encontrado'})
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto a borrar' })
  @ApiOkResponse({type: Producto, description: 'Datos de producto eliminados exitosamente'})
  @ApiNotFoundResponse({description: 'Producto no encontrado'})
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
