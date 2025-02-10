import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFoodDto } from './dto/food.dto';
import { Cache } from 'cache-manager';
import { PrismaService } from './prisma/prisma.service';
import { ProductService } from './app.service';
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  // @MessagePattern('get_elastic')
  // async getElastic() {
  //   return this.productService.getElastic();
  // }

  // @MessagePattern('create_elastic')
  // async createElastic() {
  //   throw new Error('Buggs product service');
  //   return this.productService.createElastic();
  // }

  @MessagePattern('get_cache')
  async getCache(@Payload() data) {
    return this.cacheManager.get('DEMO');
  }

  @MessagePattern({ cmd: 'create_food' })
  async createProduct(@Payload() data: CreateFoodDto) {
    return this.productService.createProduct(data);
  }

  @MessagePattern({ cmd: 'get_foods' })
  async getProducts() {
    return this.productService.getProducts();
  }

  @MessagePattern({ cmd: 'get_food_by_id' })
  async getProductById(@Payload() id: number) {
    return this.productService.getProductById(id);
  }

  @MessagePattern({ cmd: 'update_food' })
  async updateProduct(
    @Payload() payload: { id: number; data: Partial<CreateFoodDto> },
  ) {
    const { id, data } = payload;
    return this.productService.updateProduct(id, data);
  }

  @MessagePattern({ cmd: 'delete_food' })
  async deleteProduct(@Payload() id: number) {
    return this.productService.deleteProduct(id);
  }

  // @MessagePattern('get_product')
  // getProduct(@Payload() data) {
  //   console.log(data);

  //   return this.appService.getProduct();
  // }

  // @MessagePattern('order_key')
  // orders(@Payload() data) {
  //   return this.appService.orders(data);
  // }
}

// yarn add prisma @prisma/client
// yarn prisma init
// update .env
// yarn prisma db pull
// yarn prisma generate

// yarn add @nestjs/config
