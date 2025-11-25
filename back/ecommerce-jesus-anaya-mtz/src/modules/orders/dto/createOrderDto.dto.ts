import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Product } from "src/modules/products/product.entity";

export class CreateOrderDto {

    @ApiProperty({
        description: 'ID del usuario que realiza la orden (debe ser un UUID válido)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID('4', {message: "El userId debe ser un UUID válido"})
    @IsNotEmpty({message: 'El userId es un campo requerido'})
    userId: string;

    @ApiProperty({
        description: 'Arreglo de productos que forman parte de la orden',
        example: [
            {
                id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
            }
        ]
    })
    @IsArray({message: 'El campo productos debe ser un arreglo'})
    @ArrayMinSize(1, {message: 'El array de products debe contener al menos un elemento'})
    @ValidateNested({each: true})
    products: Product[];
}