import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  logging: true,
  migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
  entities: [join(__dirname, '/entities/**/*{.ts,.js}')],
  autoLoadEntities: true,
};

export const configRegister = registerAs('typeorm', () => config);

// @ts-ignore
export default new DataSource(config);
