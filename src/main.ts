import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';

import { DataSource } from 'typeorm';
import { dataSourceOptions } from './config/typeorm';

(async () => {
  const dataSource = new DataSource(dataSourceOptions);

  await dataSource.initialize();

  await dataSource.runMigrations({
    transaction: 'all',
  });
  await dataSource.destroy();
})();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());
  app.use(helmet());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
