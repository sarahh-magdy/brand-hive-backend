// src/modules/customer/customer.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';

// استدعاء الـ Guards و Decorators بالمسارات الكاملة
import { AuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@Controller('customer')
@UseGuards(AuthGuard, RolesGuard)
@Roles(['customer', 'admin'])
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(['customer', 'admin'])
  getProfile(@Request() req: any) {
    return {
      message: 'Customer profile',
      success: true,
      data: { user: req.user },
    };
  }
}