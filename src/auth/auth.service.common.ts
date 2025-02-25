import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class CommonAuthService {
  private passwordHashSaltRounds = 12;

  public async hashPassword(rawPassword: string): Promise<string> {
    return await argon2.hash(rawPassword.trim());
  }

  public async validatePasswordHash(
    rawPassword: string,
    hash: string,
  ): Promise<boolean> {
    return await argon2.verify(rawPassword.trim(), hash);
  }
}
