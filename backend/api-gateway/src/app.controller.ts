import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private productService: ClientProxy,
    @Inject('ORDER_SERVICE') private orderService: ClientProxy,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('NOTIFY_SERVICE') private notifyService: ClientProxy,
    @Inject('USER_SERVICE') private userService: ClientProxy,
  ) {}

  @Post('/register')
  register(@Body() data: { email: string; password: string }) {
    return this.authService.send({ cmd: 'register' }, data);
  }

  @Post('/login')
  login(@Body() data: { email: string; password: string }) {
    return this.authService.send({ cmd: 'login' }, data);
  }

  @Post('/product')
  createProduct(
    @Body()
    data: {
      name: string;
      price: number;
      stock: number;
      store_id: number;
    },
  ) {
    return this.productService.send({ cmd: 'create_food' }, data);
  }

  @Get('/product')
  getAllProducts() {
    return this.productService.send({ cmd: 'get_foods' }, {});
  }

  @Get('/product/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.send({ cmd: 'get_food_by_id' }, id);
  }

  @Post('/order')
  async createOrder(
    @Body()
    data: {
      [x: string]: any;
      user_id: string;
      total_price: number;
      items: { food_id: number; quantity: number; price: number }[];
    },
  ) {
    this.notifyService.emit({ cmd: 'confirm_order' }, data.user_email);
    return this.orderService.send({ cmd: 'create_order' }, data);
  }

  @Get('/order')
  getAllOrders() {
    return this.orderService.send({ cmd: 'get_orders' }, {});
  }

  @Get('/order/:id')
  getOrderById(@Param('id') id: number) {
    return this.orderService.send({ cmd: 'get_order_by_id' }, id);
  }

  @Patch('/order/:id/status')
  updateOrderStatus(@Param('id') id: number, @Body() data: { status: string }) {
    return this.orderService.send(
      { cmd: 'update_order' },
      { id, status: data.status },
    );
  }
}
