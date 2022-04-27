import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICruiser } from './cruiser.model';
import { Model } from 'mongoose';

@Injectable()
export class CruisersService {
  constructor(
    @InjectModel('Cruiser') private readonly CruiserModel: Model<ICruiser>,
  ) {}

  findAll() {
    return this.CruiserModel.find();
  }
}
