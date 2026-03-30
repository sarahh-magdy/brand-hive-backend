import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import devConfig from './config/env/dev.config';
import { CustomerModule } from './modules/customer/customer.module';

// التعديل هنا: شلنا @common واستخدمنا المسار الحقيقي
import { AuthGuard } from './common/guards/auth.guard'; 
import { RolesGuard } from './common/guards/roles.guard';

// التعديل هنا: شلنا @shared واستخدمنا المسار الحقيقي
import { UserMongoModule } from './shared/index'; 

@Module({
  imports: [
    ConfigModule.forRoot({  
      load: [devConfig], 
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').url,
      }),
    }),
    UserMongoModule, 
    AuthModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}