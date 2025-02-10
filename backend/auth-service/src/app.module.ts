import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { PrismaService } from './prisma_auth/prisma.service';
import { PrismaModule } from './prisma_auth/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './app.service';
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserRepository],
  exports: [AuthService, UserRepository],
})
export class AuthModule {}
