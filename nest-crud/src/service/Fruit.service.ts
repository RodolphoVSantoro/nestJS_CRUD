import { Injectable } from '@nestjs/common';
import { FruitDTO } from '../DTO/FruitDTO';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { validateFruit } from '../helpers/validators';
import { Fruit, FruitDocument } from '../schema/Fruit.schema';
import _ from "lodash";

//TODO: fazer tratamento de erro do mongo
@Injectable()
export class FruitService {
  constructor(
    @InjectModel(Fruit.name) private fruitModel: Model<FruitDocument>,
  ) {}
  async getFruits(
    _id: string,
    name: string,
    color: string,
  ): Promise<FruitDTO[]> {
    let fruit: Partial<FruitDTO> = {};
    if (_id) {
      fruit._id = _id;
    }
    if (name) {
      fruit.name = name;
    }
    if (color) {
      fruit.color = color;
    }
    if (!_.isEmpty(fruit)) {
      return await this.fruitModel.find(fruit).exec();
    } else {
      return await this.fruitModel.find().exec();
    }
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
      return 'created: ' + msg;
    } else {
      return 'none created';
    }
  }

  async updateFruits(fruitFilter: FruitDTO): Promise<string> {
    let fruit: Partial<FruitDTO> = {};
    if (fruitFilter.name !== '') {
      fruit.name = fruitFilter.name;
    }
    if (fruitFilter.color !== '') {
      fruit.color = fruitFilter.color;
    }
    if (!_.isEmpty(fruit)) {
      await this.fruitModel
        .findOneAndUpdate({ _id: fruitFilter._id }, fruit)
        .exec();
      return 'success';
    } else {
      return 'error: fill at least one field other than id';
    }
  }

  async deleteFruits(fruitFilter: FruitDTO): Promise<string> {
    const fruit: Partial<FruitDTO> = {};
    if (fruitFilter._id) {
      fruit._id = fruitFilter._id;
    }
    if (fruitFilter.name) {
      fruit.name = fruitFilter.name;
    }
    if (fruitFilter.color) {
      fruit.color = fruitFilter.color;
    }
    if (!_.isEmpty(fruit)) {
      const n = await this.fruitModel.deleteMany(fruit).exec();
      return n.deletedCount.toString() + ' deleted';
    } else {
      return 'none deleted';
    }
  }
}
