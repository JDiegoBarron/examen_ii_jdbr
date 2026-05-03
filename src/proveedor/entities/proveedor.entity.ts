import { ApiProperty } from "@nestjs/swagger";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedor {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    nombre!: string; 

    @ApiProperty()
    @Column()
    direccion!: string; 
    
    @ApiProperty()
    @Column()
    telefono!: string;

    @ApiProperty({type: () => Producto, isArray: true})
    @OneToMany(()=> Producto, (producto)=> producto.proveedor)
    productos!: Producto[];
}
