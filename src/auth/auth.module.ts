import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/services/admin.service';
import { Admin } from '../entities/admin.entity';
import Driver from '../entities/driver.entity';
import User from '../entities/users.entity';
import { CommonAuthService } from './auth.service.common';
import { AdminAuthService } from '../admin/services/admin.auth.service';
import { DriversAuthService } from './services/auth.drivers.service';
import { UserAuthService } from './services/auth.user.service';
import { AdminAuthController } from '../admin/controllers/admin.auth.controller';

@Module({
  controllers: [AdminAuthController],
  providers: [
    CommonAuthService,
    AdminAuthService,
    UserAuthService,
    DriversAuthService,
    AdminService,
  ],
  imports: [TypeOrmModule.forFeature([User, Admin, Driver]), AdminModule],
})
export class AuthModule {}
