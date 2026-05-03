import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDecimal, IsPositive } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty({ description: 'Descripcion breve de la categoria', 
        example: "Bebidas" })
    @IsString()
    @IsNotEmpty()
    descripcion!: string;
}
