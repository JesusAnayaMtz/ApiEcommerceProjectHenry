import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    /**
     * Se le pasa un email valido para poder iniciar sesion
     * @example user@example.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    /**
     * Se ingresa una contraseña valida para iniciar sesion
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
}