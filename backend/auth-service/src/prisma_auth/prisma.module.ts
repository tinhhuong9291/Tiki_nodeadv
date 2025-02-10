import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma_auth/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
