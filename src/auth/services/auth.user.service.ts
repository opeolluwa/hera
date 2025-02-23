import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from '../dto/auth.users.dto';
@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(payload: RegisterUserDTO) {

    // see if user exists in the database
    const user = this.userRepository.create(payload);
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password;
    user.isVerified = false;
    return this.userRepository.save(user);
  }

  async login() {
    return 'User login';
  }

  async forgotPassword() {
    return 'User forgot password';
  }

  async resetPassword() {
    return 'User reset password';
  }

  async changePassword() {
    return 'User change password';
  }

  async updateProfile() {
    return 'User update profile';
  }

  async logout() {
    return 'User logout';
  }
}
