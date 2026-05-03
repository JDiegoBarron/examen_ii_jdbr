import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsNotEmpty } from "class-validator";

export class CreateVentaDto {
    @ApiProperty({ description: 'ID del producto que se vende', example: 105 })
    @IsInt()
    @IsNotEmpty()
    id_producto!: number;

    @ApiProperty({ description: 'Cantidad de unidades vendidas', example: 2 })
    @IsInt()
    @IsPositive()
    cantidad!: number;
}