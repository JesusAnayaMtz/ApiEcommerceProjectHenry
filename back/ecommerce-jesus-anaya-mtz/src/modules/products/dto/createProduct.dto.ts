import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsUUID, MaxLength, Min } from "class-validator";

export class CreateProductDto{

  @ApiProperty({
    description: 'El Nombre del producto es obligatorio y máximo 50 caracteres.',
    example: 'Laptop Hp 14"',
    maxLength: 50,
  })
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
  name: string;


  @ApiProperty({
    description: 'La descripción del producto es obligatoria.',
    example: 'Laptop hp 15-1253, 14" Intel core i5, 16 Gb de ram',
  })
  @IsString()
  @IsNotEmpty()
  description: string;


  @ApiProperty({
    description: 'El precio es obligatorio, debe ser un número positivo y con máximo 2 decimales.',
    example: 15999.50,
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número con hasta 2 decimales.' })
  @IsPositive({ message: 'El precio debe ser un valor positivo.' })
  price: number;


  @ApiProperty({
    description: 'El stock no puede ser nulo y debe ser un número entero igual o mayor a 0.',
    example: 25,
  })
  @IsInt({ message: 'El stock debe ser un número entero.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  stock: number;


  @ApiProperty({
    description: 'La URL de la imagen es opcional. Si se provee, debe ser una URL válida.',
    example: 'https://example.com/product-image.jpg',
    required: false, // Indica a Swagger que este campo es opcional
  })
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen no es válida.' })
  imgUrl?: string;


  @ApiProperty({
    description: 'El ID de la categoría a la que pertenece el producto. Debe ser un UUID válido.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsUUID('all', { message: 'El ID de la categoría debe ser un UUID válido.'})
  @IsNotEmpty({ message: 'Debes especificar una categoría.' })
  categoryId: string;
}