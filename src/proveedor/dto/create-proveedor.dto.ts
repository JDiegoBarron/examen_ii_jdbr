import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateProveedorDto {
  @ApiProperty({ example: 'Dell Technologies' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'Av. Reforma 123' })
  @IsString()
  @IsNotEmpty()
  direccion!: string;
  
  @ApiProperty({ example: '555-0123' })
  @IsString()
  @IsNotEmpty()
  telefono!: string;
}