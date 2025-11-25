import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { OrderService } from './order.service';
import { OrderRepository } from './orderRepository';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController]
})
export class OrdersModule {}
