import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './app.service';
import { UserRepository } from './repositories/user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { SessionService } from './services/session.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      auth_pass: process.env.REDIS_PASSWORD || undefined,
      ttl: parseInt(process.env.CACHE_TTL, 10),
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: true,
          },
          persistent: true,
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AppController],
  providers: [UserService, PrismaService, UserRepository, SessionService],
})
export class AppModule {}
