import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'auth_queue',
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
