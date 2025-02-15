import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'hera',
  password: 'hera',
  database: 'hera',
  synchronize: false,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
