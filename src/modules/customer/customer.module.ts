import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [UserMongoModule],
  controllers: [CustomerController],
  providers: [CustomerService], 
  exports: [CustomerService] 
})
export class CustomerModule {}