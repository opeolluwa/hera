import { Inject, Injectable } from '@nestjs/common';
import { AdminAuthService } from './services/auth.admin.service';
import { DriversAuthService } from './services/auth.drivers.service';
import { UserAuthService } from './services/auth.user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AdminAuthService)
    private readonly adminAuthService: AdminAuthService,

    @Inject(UserAuthService)
    private readonly userAuthService: UserAuthService,

    @Inject(DriversAuthService)
    private readonly driversAuthService: DriversAuthService,
  ) {}
}
