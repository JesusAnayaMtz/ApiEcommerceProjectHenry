import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orderRepository";
import { CreateOrderDto } from "./dto/createOrderDto.dto";

@Injectable()
export class OrderService {

    constructor(private readonly orderRepository: OrderRepository){}

    async getOrderByIdService(id: string) {
        return await this.orderRepository.getOrderRepository(id);
    }

    async addOrderService(orderDto: CreateOrderDto) {
        return await this.orderRepository.addOrderRepository(orderDto)
    }

}