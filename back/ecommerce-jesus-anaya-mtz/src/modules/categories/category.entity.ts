import { Product } from "src/modules/products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity('categories')
export class Category {

    /**
     * Le id es un valor unico en la base de datos el cual es un formato UUID
     */
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    /**
     * Nombre que se le asiganara a la categoria
     * @example Laptops
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique:true,
    })
    name: string;

    /**
     * Es la relacion que hay de las categorias con productos una categoria puede estar en varios productos
     */
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}