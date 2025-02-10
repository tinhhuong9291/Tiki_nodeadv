import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from './prisma_order/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto_order/order.dto';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private readonly orderRepository: OrderRepository,
    // @Inject('SHIPPING_NAME') private shippingService: ClientProxy,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    // Gọi repository để tạo đơn hàng
    const newOrder = await this.orderRepository.create(createOrderDto);
    return newOrder;
  }

  async getOrders() {
    return await this.orderRepository.findAll();
  }

  async getOrderById(orderId: number) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  //  Cập nhật thông tin đơn hàng dựa trên UpdateOrderDto

  async updateOrder(orderId: number, updateOrderDto: UpdateOrderDto) {
    // Kiểm tra đơn hàng có tồn tại không
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    // Cập nhật đơn hàng
    const updatedOrder = await this.orderRepository.update(
      orderId,
      JSON.stringify(updateOrderDto),
    );
    return updatedOrder;
  }
}
