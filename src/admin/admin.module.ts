import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonAuthService } from 'src/auth/auth.service.common';
import { Admin } from '../entities/admin.entity';
import { AdminAuthController } from './controllers/admin.auth.controller';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { AdminAuthService } from './services/admin.auth.service';

@Module({
  providers: [AdminService, CommonAuthService, AdminAuthService],
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController, AdminAuthController],
})
export class AdminModule {}
