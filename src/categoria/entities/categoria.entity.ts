import { ApiProperty } from "@nestjs/swagger";
import { Producto } from "src/producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    descripcion!: string;
    
    @ApiProperty({type: () => Producto, isArray: true})
    @OneToMany(()=> Producto, (producto)=> producto.categoria)
    productos!: Producto[];
}
