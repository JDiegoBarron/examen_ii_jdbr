import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FacturaModule } from './factura/factura.module';
import { VentaModule } from './venta/venta.module';
import { ProductoModule } from './producto/producto.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'examen2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule, UserModule, FacturaModule, VentaModule, ProductoModule, ProveedorModule, CategoriaModule, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
