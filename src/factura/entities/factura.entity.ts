import { ApiProperty } from "@nestjs/swagger";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { Venta } from "src/venta/entities/venta.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Factura {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @CreateDateColumn({ 
    name: 'fecha', 
    type: 'timestamp' 
    })
    fecha!: Date;

    @ApiProperty()
    @ManyToOne(() => Cliente, (cliente) => cliente.facturas, {
        nullable: false
    })
    @JoinColumn({ name: 'id_cliente' })
    cliente!: Cliente;
        
    @ApiProperty({type: () => Venta, isArray: true})
    @OneToMany(()=> Venta, (venta)=> venta.factura)
    ventas!: Venta[];
}
