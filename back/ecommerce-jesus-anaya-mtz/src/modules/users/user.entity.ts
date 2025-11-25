import { Order } from 'src/modules/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  /**
   * ID único del usuario (UUID)
   * @example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * name del usuario
   * @example: 'Jesus Anaya'
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  /**
   * Correo electrónico del usuario
   * @example: 'example@email.com'
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  /**
   * La contraseña debe tener minimo 8 caracteres (1 mayuscula, 1 minuscula, 1 numero y uno de los siguientes caracteres !@#$%^&* minimo)
   * @example 2055Jesus#
   */
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  /**
   * La Direccion debe tener minimo caracteres
   * @example Calle 20, Principal #10
   */
  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  /**
   * El Telefono debe ser un numero
   * @example 2714523686
   */
  @Column({
    type: 'bigint',
  })
  phone: number;

  /**
   * El Pais debe tener minimo 5 caracteres
   * @example Mexico
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  /**
   * La ciudad debe tener mini 5 caracteres
   * @example Veracruz
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  /**
   * isAdmin es opcional y por defecto es false y puede no ir en el body
   *
   */
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  /**
   * Orders se la relacion en la base de datos entre el user y sus ordenes'
   */
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
