import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty} from "class-validator";

export class CreateFacturaDto {
    @ApiProperty({ 
        description: 'Lista de IDs de las ventas que se incluirán en la factura', 
        example: [1, 1] 
    })
    @IsArray()
    @IsInt({ each: true })
    @ArrayMinSize(1)      
    ids_ventas: number[] | undefined;

    @ApiProperty({ description: 'ID del cliente realizando la factura', example: 1 })
    @IsInt()
    @IsNotEmpty()
    id_cliente!: number;
}
