import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { FruitModule } from './Fruit.module';

@Module({
  imports: [FruitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
