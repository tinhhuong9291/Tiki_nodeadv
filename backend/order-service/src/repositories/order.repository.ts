import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma_order/prisma.service';
import { CreateOrderDto } from '../dto_order/order.dto';
@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        user_id: data.user_id,
        total_price: data.total_price,
        address_id: data.address_id,
        store_id: data.store_id,
        order_foods: {
          create: data.items.map((item) => ({
            food_id: item.food_id,
            quantity: item.quantity,
            price_at_time_of_order: item.price_at_time_of_order,
          })),
        },
      },
      include: { order_foods: true },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { order_foods: true } });
  }

  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { order_id: id },
      include: { order_foods: true },
    });
  }

  async update(id: number, status: string) {
    return this.prisma.order.update({
      where: { order_id: id },
      data: { status },
    });
  }

  async delete(id: number) {
    return this.prisma.order.delete({ where: { order_id: id } });
  }
}
