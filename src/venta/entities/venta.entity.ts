import { ApiProperty } from "@nestjs/swagger";
import { Factura } from "src/factura/entities/factura.entity";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venta {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    cantidad!: number; 
    
    @ApiProperty()
    @ManyToOne(()=> Producto, (producto) => producto.ventas,{
        nullable : false
    })
    @JoinColumn({ name: 'id_producto'})
    producto!: Producto;
    
    @ApiProperty({ type: () => Factura })
    @ManyToOne(()=> Factura, (factura) => factura.ventas,{
        nullable : true
    })
    @JoinColumn({ name: 'id_factura'})
    factura!: Factura;
}
