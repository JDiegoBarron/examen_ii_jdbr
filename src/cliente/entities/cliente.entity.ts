import { ApiProperty } from "@nestjs/swagger";
import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
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

    @ApiProperty({type: () => Factura, isArray: true})
    @OneToMany(() => Factura, (factura) => factura.cliente)
    facturas?: Factura[];
}
