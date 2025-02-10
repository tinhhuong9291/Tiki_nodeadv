import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateFoodDto } from './dto/food.dto';
import { FoodRepository } from './repositories/food.repository';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    private prismaService: PrismaService,
    // @Inject('SHIPPING_NAME') private shippingService: ClientProxy,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @Inject('FOOD_REPOSITORY') private foodRepository: FoodRepository,
    private elasticService: ElasticsearchService,
  ) {}

  async createProduct(data: CreateFoodDto) {
    const product = await this.foodRepository.create(data);
    await this.cacheManager.del('products'); // Xóa cache khi thêm mới
    return product;
  }

  async getProducts() {
    const cachedProducts = await this.cacheManager.get('products');
    if (cachedProducts) {
      return cachedProducts;
    }

    const products = await this.foodRepository.findAll();
    await this.cacheManager.set('products', products, 60);
    return products;
  }

  async getProductById(id: number) {
    const cachedProduct = await this.cacheManager.get(`product_${id}`);
    if (cachedProduct) {
      return cachedProduct;
    }

    const product = await this.foodRepository.findById(id);
    await this.cacheManager.set(`product_${id}`, product, 60);
    return product;
  }

  async updateProduct(id: number, data: Partial<CreateFoodDto>) {
    const product = await this.foodRepository.update(id, data);
    await this.cacheManager.del(`product_${id}`);
    await this.cacheManager.del('products');
    return product;
  }

  async deleteProduct(id: number) {
    await this.foodRepository.delete(id);
    await this.cacheManager.del(`product_${id}`);
    await this.cacheManager.del('products');
  }
}
