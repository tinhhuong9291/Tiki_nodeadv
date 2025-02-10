import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'order_queue',
        queueOptions: {
          durable: true, // giữ lại các queue khi rabbitMQ bị restart
        },
        persistent: true, // giữ lại các message khi rabbitMQ bị restart
      },
    },
  );
  await app.listen();
}
bootstrap();
