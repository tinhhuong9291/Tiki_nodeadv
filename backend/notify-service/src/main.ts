import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'notify_queue',
        queueOptions: {
          durable: false, // giữ lại các queue khi rabbitMQ bị restart
        },
        persistent: false, // giữ lại các message khi rabbitMQ bị restart
      },
    },
  );
  await app.listen();
}
bootstrap();
