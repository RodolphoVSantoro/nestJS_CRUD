import { Injectable } from '@nestjs/common';
import { FruitDTO } from '../DTO/FruitDTO';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { validateFruit } from '../helpers/validators';
import { Fruit, FruitDocument } from '../schema/Fruit.schema';
import * as _ from "lodash";

@Injectable()
export class FruitService {
  constructor(
    @InjectModel(Fruit.name) private fruitModel: Model<FruitDocument>,
  ) { }
  async getFruits(
    _id: string,
    name: string,
    color: string,
  ): Promise<FruitDTO[]> {
    // Sets the fruit object to only include the fields that are not empty
    const fruit = _.pickBy({ _id, name, color }, _.identity);
    return await this.fruitModel.find(fruit).exec();
  }

  async createFruit(fruits: FruitDTO[]): Promise<string> {
    let msg = '';
    for (const fruit of fruits) {
      if (validateFruit(fruit)) {
        await new this.fruitModel(fruit).save();
        msg += JSON.stringify(fruit) + ' ';
      }
    }
    if (msg.length > 0) {
      return 'none created';
    }
    return 'created: ' + msg;
  }

  async updateFruits(fruitFilter: FruitDTO): Promise<string> {
    const { name, color } = fruitFilter;
    const fruit = _.pickBy({ name, color }, _.identity);
    if (_.isEmpty(fruit) || !fruitFilter._id) {
      return 'error: fill at least one field other than id';
    }
    await this.fruitModel
      .findOneAndUpdate({ _id: fruitFilter._id }, fruit)
      .exec();
    return 'success';
  }

  async deleteFruits(fruitFilter: FruitDTO): Promise<string> {
    const { _id, name, color } = fruitFilter;
    const fruit = _.pickBy({ _id, name, color }, _.identity);
    if (_.isEmpty(fruit)) {
      return 'none deleted';
    }
    const n = await this.fruitModel.deleteMany(fruit).exec();
    return n.deletedCount.toString() + ' deleted';
  }
}
