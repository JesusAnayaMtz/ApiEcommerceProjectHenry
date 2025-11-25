import { In, Repository } from "typeorm";
import { Order } from "./order.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Product } from "../products/product.entity";
import { OrderDetail } from "./orderDetail.entity";
import { CreateOrderDto } from "./dto/createOrderDto.dto";

@Injectable()
export class OrderRepository {
    
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>, 
        @InjectRepository(Product) private productRepository: Repository<Product>, 
        @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>)
        { }

    async addOrderRepository(orderDto: CreateOrderDto) {
        const user = await this.userRepository.findOneBy({id: orderDto.userId});
        
        if(!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const productIds = orderDto.products.map((p) => p.id)

        const dbProducts = await this.productRepository.findBy({
            id: In(productIds)
        })

        const validadProducts = dbProducts.filter((p) => p.stock > 0)

        if(validadProducts.length !== orderDto.products.length){
            throw new BadRequestException('Algunos productos no tienen stock disponible o no existen');
        }

        let totalPrice = 0;

        const updateProducts: Product[] = [];

        for(const product of validadProducts){
            totalPrice += Number(product.price)

            product.stock -= 1

            updateProducts.push(product)
        }

        await this.productRepository.save(updateProducts)

        const order = this.orderRepository.create({
            date: new Date(),
            user,
        })

        const saveOrder = await this.orderDetailsRepository.save(order);

        const orderDetail = this.orderDetailsRepository.create({
            price: Number(totalPrice.toFixed(2)),
            products: validadProducts,
            order:saveOrder,
        })

        const saveOrderDetail = await this.orderDetailsRepository.save(orderDetail)

        saveOrder.orderDetail = saveOrderDetail;

        await this.orderRepository.save(saveOrder);

        return {
            orderId: saveOrder.id,
            orderDetail: {
                id: saveOrderDetail.id,
                price: saveOrderDetail.price
            }
        }
    }

    async getOrderRepository(id: string) {
        const order = await this.orderRepository.findOne({
            where: {id},
            relations: {
                user: true,
                orderDetail: {
                    products: true
                }
            }
        })

        if(!order) {
            return 'Orden no encontrada';
        }

        return {
            id: order.id,
            date: order.date,
            user: {
                id: order.user.id
            },
            orderDetail: {
                id: order.orderDetail.id,
                price: order.orderDetail.price,
                products: order.orderDetail.products.map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    imgUrl: p.imgUrl
                })),
            },
        }
    }
}