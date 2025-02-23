import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { AdminModule } from './admin/admin.module';
import { CarsModule } from './cars/cars.module';
import { PaymentModule } from './payment/payment.module';
import { BookingModule } from './booking/booking.module';
import { UserService } from './user/user.service';
import { CarService } from './car/car.service';

import typeorm from './config/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    UsersModule,
    DriversModule,
    AdminModule,
    CarsModule,
    PaymentModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, CarService],
})
export class AppModule {}
