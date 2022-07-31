import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FruitService } from '../service/Fruit.service';
import { FruitDTO } from '../DTO/FruitDTO';

@Controller('fruit')
export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  @Get()
  read(
    @Param('id') id: string,
    @Param('name') name: string,
    @Param('color') color: string,
  ): FruitDTO[] {
    return this.fruitService.getFruits({ _id: id, name: name, color: color });
  }

  @Post()
  create(@Body() fruit: FruitDTO): string {
    return this.fruitService.createFruit(fruit);
  }

  @Patch()
  update(@Body() fruitFilter: string): string {
    return this.fruitService.updateFruits(fruitFilter);
  }

  @Delete()
  delete(@Body() fruitFilter: string): string {
    return this.fruitService.deleteFruits(fruitFilter);
  }
}
