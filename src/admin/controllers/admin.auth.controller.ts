import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AdminAuthService } from '../services/admin.auth.service';
import { CreateAdminDTO } from 'src/admin/dto/createAdmin';

@Controller({ version: '1', path: 'admin/auth' })
export class AdminAuthController {
  constructor(
    @Inject(AdminAuthService)
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @HttpCode(201)
  @Post('register')
  async createAdminUser(@Body() requestBody: CreateAdminDTO) {
    return this.adminAuthService.register(requestBody);
  }
}
