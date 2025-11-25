import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "./createUserDto.dto";
import { ApiHideProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto){
    /**
         * El Nombre debe tener minimo 3 caracteres
         * @example Jose
         */
        @IsString()
        @MinLength(3)
        @MaxLength(80)
        @IsNotEmpty()
        name: string;
    
        /**
         * El Email debe tener un formato valido
         * @example user@example.com
         */
        @IsNotEmpty()
        @IsEmail()
        email: string;
    
        /**
         * La contraseña debe tener minimo 8 caracteres (1 mayuscula, 1 minuscula, 1 numero y uno de los siguientes caracteres !@#$%^&* minimo)
         * @example 2055Jesus#
         */
        @IsNotEmpty()
        @MinLength(8)
        @IsString()
        @MaxLength(15)
        @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
            message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
        })
        password: string;
    
        /**
         * La Direccion debe tener minimo caracteres
         * @example Calle 20, Principal #10
         */
        @IsString()
        @MinLength(3)
        @MaxLength(80)
        address: string;
    
        /**
         * El Telefono debe ser un numero
         * @example 2714523686
         */
        @IsNotEmpty()
        @IsNumber()
        phone: number;
    
        /**
         * El Pais debe tener minimo 5 caracteres
         * @example Mexico
         */
        @IsString()
        @MinLength(5)
        @MaxLength(20)
        country: string;
    
        /**
         * La ciudad debe tener mini 5 caracteres
         * @example Veracruz
         */
        @IsString()
        @MinLength(5)
        @MaxLength(20)
        city: string;
    
    
        /**
        * isAdmin es opcional y por defecto es false y puede no ir en el body
        * 
        */
        @ApiHideProperty()
        @IsOptional()
        @IsBoolean()
        isAdmin: boolean = false;
}