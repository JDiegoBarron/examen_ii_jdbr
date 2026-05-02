import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../../auth/entities/UserRole";

@Entity()
export class User{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    name!: string; 

    @ApiProperty()
    @Column({unique:true})
    username!: string; 
    
    @ApiProperty()
    @Column()
    password!: string; 

    @ApiProperty()
    @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // por defecto al registrarse
    })
    role!: UserRole;
}