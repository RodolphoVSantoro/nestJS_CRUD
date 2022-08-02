import { Injectable } from '@nestjs/common';
import { FruitDTO } from '../DTO/FruitDTO';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Fruit, FruitDocument } from '../schema/Fruit.schema';

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
    //TODO: melhorar código da geração desse objeto de filtro
    // fazer em todas que usam fitro
    const entries: string[][] = [];
    if (_id !== undefined) {
      entries.push(['_id', _id]);
    }
    if (name !== undefined) {
      entries.push(['name', name]);
    }
    if (color !== undefined) {
      entries.push(['color', color]);
    }
    if (entries.length > 0) {
      const fruit = Object.fromEntries(entries);
      return await this.fruitModel.find(fruit).exec();
    } else {
      return await this.fruitModel.find().exec();
    }
  }

  async createFruit(fruit: FruitDTO): Promise<string> {
    if (fruit._id && fruit.name && fruit.color) {
      if (
        fruit._id.length > 0 &&
        fruit.name.length > 0 &&
        fruit.color.length > 0
      ) {
        await new this.fruitModel(fruit).save();
        //TODO: add error handling
        return 'success: ' + JSON.stringify(fruit);
      }
    }
    return 'failure. must fill all fields';
  }
  async updateFruits(fruitFilter: FruitDTO): Promise<string> {
    const keys: string[][] = [];
    if (fruitFilter.name !== '') {
      keys.push(['name', fruitFilter.name]);
    }
    if (fruitFilter.color !== '') {
      keys.push(['color', fruitFilter.color]);
    }
    if (keys.length > 0) {
      await this.fruitModel
        .findOneAndUpdate({ _id: fruitFilter._id }, Object.fromEntries(keys))
        .exec();
      return 'success';
    } else {
      return 'error: fill at least one field other than id';
    }
  }
  async deleteFruits(fruitFilter: FruitDTO): Promise<string> {
    const keys: string[][] = [];
    if (fruitFilter._id !== '') {
      keys.push(['_id', fruitFilter._id]);
    }
    if (fruitFilter.name !== '') {
      keys.push(['name', fruitFilter.name]);
    }
    if (fruitFilter.color !== '') {
      keys.push(['color', fruitFilter.color]);
    }
    if (keys.length > 0) {
      const n = await this.fruitModel.deleteMany(Object.fromEntries(keys));
      return n.deletedCount.toString() + ' deleted';
    } else {
      return 'none deleted';
    }
  }
}
