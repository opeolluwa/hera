import { Controller, Inject, Post } from '@nestjs/common';
import { CommonAuthService } from './auth.service.common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CommonAuthService)
    private readonly CommonAuthService: CommonAuthService,
  ) {}

  @Post('admin/login')
  async adminLogin() {}
}
