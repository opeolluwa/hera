import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthService {
  constructor() {}

  async register() {
    return 'User register';
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
