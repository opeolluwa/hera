import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminAuthService } from './services/auth.admin.service';
import { UserAuthService } from './services/auth.user.service';
import { DriversAuthService } from './services/auth.drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entities/users.entity';
import Admin from '../entities/admin.entity';
import Driver from '../entities/driver.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminAuthService,
    UserAuthService,
    DriversAuthService,
  ],
  imports: [TypeOrmModule.forFeature([User, Admin, Driver])],
})
export class AuthModule {}
