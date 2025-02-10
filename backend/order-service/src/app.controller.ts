import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto, UpdateOrderDto } from './dto_order/order.dto';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: AppService,
    // @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'create_order' })
  createOrder(data: CreateOrderDto) {
    return this.orderService.createOrder(data);
    // return this.orderService.send({ cmd: 'create_order' }, data);
  }

  @MessagePattern({ cmd: 'get_orders' })
  getOrders() {
    return this.orderService.getOrders();
    // return this.orderService.send({ cmd: 'get_orders' }, {});
  }

  @MessagePattern({ cmd: 'get_order_by_id' })
  getOrderById(id: number) {
    return this.orderService.getOrderById(id);
    // return this.orderService.send({ cmd: 'get_order_by_id' }, id);
  }

  @MessagePattern({ cmd: 'update_order' })
  async updateOrder(payload: { id: number; data: UpdateOrderDto }) {
    const { id, data } = payload;
    return await this.orderService.updateOrder(id, data);
  }
}
