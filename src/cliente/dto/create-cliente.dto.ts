import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateClienteDto {
  @ApiProperty({ example: 'Carlos Perez' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 'Calle Juana de Cos' })
  @IsString()
  @IsNotEmpty()
  direccion!: string;
  
  @ApiProperty({ example: '38404-92983' })
  @IsString()
  @IsNotEmpty()
  telefono!: string;
}
