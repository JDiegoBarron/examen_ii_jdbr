import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "../entities/UserRole";

export class LoginUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;
}