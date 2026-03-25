import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
    getProfile() {
        return 'Customer profile';
    }
}