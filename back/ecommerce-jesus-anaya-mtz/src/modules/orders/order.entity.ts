import { User } from 'src/modules/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from 'uuid'
import { OrderDetail } from './orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {

  @ApiProperty({ 
    description: 'ID único de la orden (UUID)',
    example: 'c3e2b8b0-5b9a-4b0e-8c3c-3b3b3b3b3b3b'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Fecha de creación de la orden se genera automaticamente',
  })
  @Column()
  date: Date;

  @ApiProperty({
    description: 'Usuario asociado a la orden'
  })
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    description: 'Detalle de la orden'
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'order_detail_id' })
  orderDetail: OrderDetail;
}