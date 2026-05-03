import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductoDto {
    @ApiProperty({ description: 'Descripcion breve del producto', 
        example: "Coca cola 600ml" })
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @ApiProperty({ description: 'Precio del producto', 
        example: 22.50 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @IsNotEmpty()
    precio!: number;

    @ApiProperty({ description: 'ID de la categoria a la que pertenece el producto', 
        example: 3 })
    @IsInt()
    @IsNotEmpty()
    id_categoria!: number;

    @ApiProperty({ description: 'ID del proveedor del producto', 
        example: 5 })
    @IsInt()
    @IsNotEmpty()
    id_proveedor!: number;
}
