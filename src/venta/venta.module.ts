import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forFeature([Venta]), 
  ],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
