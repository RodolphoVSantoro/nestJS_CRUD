import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FruitController } from '../controller/Fruit.controller';
import { FruitService } from '../service/Fruit.service';
import { Fruit, FruitSchema } from '../schema/Fruit.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/fruits'),
    MongooseModule.forFeature([{ name: Fruit.name, schema: FruitSchema }]),
  ],
  controllers: [FruitController],
  providers: [FruitService],
})
export class FruitModule {}
