import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query
} from "@nestjs/common";
import { FruitService } from '../service/Fruit.service';
import { FruitDTO } from '../DTO/FruitDTO';

@Controller('fruit')
export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  @Get()
  async read(
    @Query('_id') _id: string,
    @Query('name') name: string,
    @Query('color') color: string,
  ): Promise<FruitDTO[]> {
    return await this.fruitService.getFruits(_id, name, color);
  }

  @Post()
  async create(@Body() fruit: FruitDTO): Promise<string> {
    return await this.fruitService.createFruit(fruit);
  }

  @Patch()
  async update(@Body() fruitFilter: FruitDTO): Promise<string> {
    return await this.fruitService.updateFruits(fruitFilter);
  }

  @Delete()
  async delete(@Body() fruitFilter: FruitDTO): Promise<string> {
    return await this.fruitService.deleteFruits(fruitFilter);
  }
}
