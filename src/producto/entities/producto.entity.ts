import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Proveedor } from "src/proveedor/entities/proveedor.entity";
import { Venta } from "src/venta/entities/venta.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    descripcion!: string; 

    @ApiProperty()
    @Column({type: 'decimal', precision: 10, scale: 2})
    precio!: number; 

    @ApiProperty()
    @ManyToOne(()=> Proveedor, (proveedor) => proveedor.productos,{
        nullable : false
    })
    @JoinColumn({ name: 'id_proveedor'})
    proveedor!: Proveedor;

    @ManyToOne(()=> Categoria, (categoria)=> categoria.productos,{
        nullable: false
    })
    @JoinColumn({name: 'id_categoria'})
    categoria!: Categoria;
        
    @ApiProperty({type: () => Venta, isArray: true})
    @OneToMany(()=> Venta, (venta)=> venta.producto)
    ventas!: Venta[];
}
