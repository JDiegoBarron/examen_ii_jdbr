import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Venta } from 'src/venta/entities/venta.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Factura, Venta]), 
  ],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
