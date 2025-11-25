import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiExtraModels, ApiParam, ApiTags } from '@nestjs/swagger';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/createOrderDto.dto';

@ApiTags('Orders')
@Controller('orders')
@ApiExtraModels(Order)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() orderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.addOrderService(orderDto);
      return order;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error creating order',
      };
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiParam({
      name: 'id',
      description: 'El UUID de la orden que se desea consultar.',
      example: 'f8b5c2a0-c6e8-4b1a-9f0e-3d7a1b4c6e9d', 
      type: 'string', 
      format: 'uuid', 
    })
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await this.orderService.getOrderByIdService(id);
      return order;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error retrieving order',
      };
    }
  }
}
