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
import { JWT_SECRET } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminAuthController],
  providers: [
    CommonAuthService,
    AdminAuthService,
    UserAuthService,
    DriversAuthService,
    AdminService,
  ],
  imports: [
    TypeOrmModule.forFeature([User, Admin, Driver]),
    AdminModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
})
export class AuthModule {}
