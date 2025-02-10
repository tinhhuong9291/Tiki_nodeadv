import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: 'Product service' },
    transports: [
      new winston.transports.Http({
        host: 'localhost',
        port: 5044,
        level: 'error',
      }),
    ],
  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger,
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'product_queue',
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
