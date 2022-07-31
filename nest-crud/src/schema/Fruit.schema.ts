import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FruitDocument = Fruit & Document;

@Schema()
export class Fruit {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  color: string;
}

export const FruitSchema = SchemaFactory.createForClass(Fruit);
