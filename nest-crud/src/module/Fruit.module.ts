import { Module } from '@nestjs/common';
import { FruitController } from '../controller/Fruit.controller';
import { FruitService } from '../service/Fruit.service';

@Module({
  imports: [],
  controllers: [FruitController],
  providers: [FruitService],
})
export class FruitModule {}
