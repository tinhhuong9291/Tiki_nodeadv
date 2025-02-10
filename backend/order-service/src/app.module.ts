import { Module } from '@nestjs/common';
import { OrderController } from './app.controller';
import { AppService } from './app.service';
import { OrderRepository } from './repositories/order.repository';
import { PrismaModule } from './prisma_order/prisma.module';
import { PrismaService } from './prisma_order/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [AppService, OrderRepository, PrismaService],
})
export class AppModule {}
