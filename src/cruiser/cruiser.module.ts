import { Module } from '@nestjs/common';
import { CruiserController } from './cruiser.controller';
import { CruisersService } from './cruiser.service';
import cruisersModel from './cruiser.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cruiser', schema: cruisersModel }]),
  ],
  controllers: [CruiserController],
  providers: [CruisersService],
  exports: [CruisersService],
})
export class CruiserModule {}
