import { Module } from '@nestjs/common';
import { ProductController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FoodRepository } from './repositories/food.repository';
import { PrismaService } from './prisma/prisma.service';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ProductService } from './app.service'; // Rename to match the class
import { ElasticModule } from './elastic/elastic.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RedisCacheModule,
    ElasticModule,
    // ClientsModule.register([
    //   {
    //     name: 'SHIPPING_SERVICE', // Add shipping service configuration
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://admin:1234@localhost:5672'],
    //       queue: 'shipping_queue',
    //       queueOptions: {
    //         durable: true,
    //       },
    //       persistent: true,
    //     },
    //   },
    // ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    FoodRepository,
    PrismaService,
    {
      provide: 'FOOD_REPOSITORY',
      useClass: FoodRepository,
    },
  ],
})
export class AppModule {}
