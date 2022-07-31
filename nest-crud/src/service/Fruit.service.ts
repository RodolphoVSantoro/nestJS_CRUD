import { Injectable } from '@nestjs/common';
import { FruitDTO } from '../DTO/FruitDTO';

@Injectable()
export class FruitService {
  getFruits(fruit: FruitDTO): FruitDTO[] {
    return [
      { _id: '1', name: 'a', color: 'b' },
      { _id: '2', name: 'c', color: 'f' },
      { _id: '3', name: 'd', color: 'e' },
    ];
  }
  createFruit(fruit: FruitDTO): string {
    console.log(fruit);
    if (fruit._id && fruit.name && fruit.color) {
      if (
        fruit._id.length > 0 &&
        fruit.name.length > 0 &&
        fruit.color.length > 0
      ) {
        return 'success: ' + JSON.stringify(fruit);
      }
    }
    console.log(fruit._id.length);
    return 'failure';
  }
  updateFruits(fruitFilter: string): string {
    return 'success';
  }
  deleteFruits(fruitFilter: string): string {
    return 'success';
  }
}
