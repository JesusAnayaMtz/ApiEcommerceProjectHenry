import { ApiProperty } from '@nestjs/swagger'; 
import { Category } from "src/modules/categories/category.entity";
import { OrderDetail } from "src/modules/orders/orderDetail.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@Entity('products')
export class Product {


  @ApiProperty({ 
    description: 'El id UUID único del producto',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();


  @ApiProperty({ description: 'Nombre del producto (único)', maxLength: 50, example: 'Laptop HP 14"' })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true
  })
  name: string;


  @ApiProperty({ description: 'Descripción detallada del producto', example: 'Laptop HP 15-1253, 14" Intel Core i5, 16 GB de RAM' })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;


  @ApiProperty({ description: 'Precio de venta del producto', type: 'number', example: 12500.50 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;


  @ApiProperty({ description: 'Cantidad de unidades disponibles en inventario', example: 42 })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;


  @ApiProperty({ description: 'URL de la imagen del producto', required: false, example: 'https://cdn.example.com/product-image.jpg' })
  @Column({
    type: 'text',
    default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmkgabinet.com%2Fblog%2Fdiferenciar-caracteristicas-y-beneficios-de-producto-clave-para-mejorar-ventas-y-tener-exito-comercial%2F&psig=AOvVaw33rY6XxbmdfyFSJx9S061C&ust=1756407495153000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMDQiPrVq48DFQAAAAAdAAAAABAX', 
  })
  imgUrl: string;

  @ApiProperty({ description: 'ID de la categoría a la que pertenece el producto', example: 'b1c2d3e4-f5g6-7h8i-9j0k-lmnopqrstuvw' })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category?: Category | undefined;

  @ApiProperty({ description: "Relacion de muchos a muchos entre OrderDetail y Product" })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}