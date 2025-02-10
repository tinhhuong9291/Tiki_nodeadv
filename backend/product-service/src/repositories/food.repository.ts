import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from 'src/dto/food.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFoodDto) {
    return this.prisma.food.create({ data });
  }

  async findAll() {
    return this.prisma.food.findMany();
  }

  async findById(id: number) {
    return this.prisma.food.findUnique({ where: { food_id: id } });
  }

  async update(id: number, data: Partial<CreateFoodDto>) {
    return this.prisma.food.update({ where: { food_id: id }, data });
  }

  async delete(id: number) {
    return this.prisma.food.delete({ where: { food_id: id } });
  }
}
