import { Module } from '@nestjs/common';
import { NotifyController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [NotifyController],
  providers: [AppService],
})
export class AppModule {}
