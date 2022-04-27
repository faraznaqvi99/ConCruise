import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto } from 'src/dtos/CreateCustomerDto';
import { ICustomer } from './customer.model';
import { Model } from 'mongoose';
import { IMessageResponse } from 'src/interfaces/MessageResponse';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer') private readonly CustomerModel: Model<ICustomer>,
  ) {}

  private readonly customers: ICustomer[] = [];

  findAll() {
    return this.CustomerModel.find();
  }

  getByFullName(name: string) {
    return this.CustomerModel.findOne({ name });
  }

  async create(CreateCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    console.log('damn');

    const user = await this.getByFullName(CreateCustomerDto.name);
    console.log({ user });

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided name currently exists',
      );
    }
    const createdCustomer = new this.CustomerModel(CreateCustomerDto);
    return createdCustomer.save();
  }

  async edit(payload: CreateCustomerDto): Promise<IMessageResponse> {
    const { name } = payload;
    const updatedCustomer = await this.CustomerModel.updateOne(
      { name },
      payload,
    );

    if (updatedCustomer.modifiedCount !== 1) {
      throw new BadRequestException(
        'The profile with that name does not exist in the system.',
      );
    }
    return { message: `Record updated successfully` };
  }

  async delete(ids: string[]): Promise<IMessageResponse> {
    const deleteResponse = await this.CustomerModel.deleteMany({
      _id: { $in: ids },
    });
    if (deleteResponse.deletedCount === ids.length) {
      return { message: `Deleted successfully from records` };
    }
    throw new BadRequestException(`Failed to delete records`);
  }
}
