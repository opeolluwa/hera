import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommonAuthService } from '../../auth/auth.service.common';
import { CreateAdminDTO } from '../dto/createAdmin';
import { AdminService } from './admin.service';
import { ApiResponse } from 'src/adapters/apiResponse';
import { LoginAdminDTO } from '../dto/loginAdmin';
import { JwtPayload } from 'src/interfaces/jwt';
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

  public async login(request: LoginAdminDTO) {
    try {
      const admin = await this.adminService.findOneByEmail(request.email);
      if (!admin) {
        throw new NotFoundException('invalid email or password');
      }

      const isCorrectPassword = await this.commonAuthService
        .validatePasswordHash(admin.password, request.password)
        .catch((error) => {
          this.logger.error(error.message);
          throw error;
        });

      if (!isCorrectPassword) {
        throw new UnauthorizedException('invalid email or password');
      }
      const jwtPayload: JwtPayload = {
        userEmail: admin.email,
        userId: admin.identifier,
        accountType: 'admin',
      };
      const jwtToken = await this.commonAuthService
        .generateJwt(jwtPayload)
        .catch((error) => {
          throw error;
        });
      return new ApiResponse('login successful', { jwtToken });
    } catch (error) {
      if (error.status == HttpStatus.CONFLICT) {
        throw new ConflictException(error.message);
      } else {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
  }

  public async requestPasswordReset() {}

  public async setNewPassword() {}
}
