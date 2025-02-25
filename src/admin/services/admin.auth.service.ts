import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CommonAuthService } from '../../auth/auth.service.common';
import { CreateAdminDTO } from '../dto/createAdmin';
import { AdminService } from './admin.service';
import { ApiResponse } from 'src/adapters/apiResponse';
@Injectable()
export class AdminAuthService {
  constructor(
    @Inject(CommonAuthService)
    private readonly commonAuthService: CommonAuthService,
    @Inject(AdminService)
    private readonly adminService: AdminService,
  ) {}

  private readonly logger = new Logger(AdminAuthService.name);

  public async register(request: CreateAdminDTO) {
    const { email, firstName, lastName, password: rawPassword } = request;

    try {
      const admin = await this.adminService.findOneByEmail(email);
      if (admin !== null) {
        throw new ConflictException(
          'an admin with the provided email already exists ',
        );
      }
    } catch (error) {
      if (error.status == HttpStatus.CONFLICT) {
        throw new ConflictException(error.message);
      } else {
        throw new HttpException(
          'request could not be completed',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const hashedPassword = await this.commonAuthService
      .hashPassword(rawPassword)
      .catch((error) => {
        this.logger.error(`error hashing password due to ${error.message}`);
        throw new InternalServerErrorException(
          'The request could not be completed',
        );
      });

    const payload: CreateAdminDTO = {
      firstName,
      lastName,
      password: hashedPassword,
      email,
    };
    await this.adminService.create(payload).catch((error) => {
      this.logger.error(`error hashing password due to ${error.message}`);
      throw new InternalServerErrorException(
        'The request could not be completed',
      );
    });

    return new ApiResponse('Admin account successfully created', null);
  }
}
