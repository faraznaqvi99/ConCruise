import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsoleModule } from 'nestjs-console';
import { MyService } from 'src/cli/service';
import { CustomerModule } from './src/customer/customer.module';
import { CruiserModule } from './src/cruiser/cruiser.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/ConCruise?retryWrites=true',
    ),
    ConsoleModule,
    CustomerModule,
    CruiserModule,
  ],
  providers: [MyService],
})
export class AppModule {}
