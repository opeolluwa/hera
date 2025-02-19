import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

const configService = new ConfigService();
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as any,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '../entities/**/{*.ts,*.js}')],
  migrations: [join(__dirname, '../migrations/{*.ts,*.js}')],
  logging: configService.get('NODE_ENV') === 'production' ? false : true,
});
