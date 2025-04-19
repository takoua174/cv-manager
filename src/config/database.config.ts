import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
  synchronize: false, // car je veux travailler avec migrations
  driver: require('mysql2'),
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
//générer une migration
// npm run migration:generate -- src/migrations/"migration_name".ts
//éxecuter migration
// npm run migration:run
export const JwtConfig = {
  secret: process.env.JWT_SECRET as string, // Type assertion after validation
  expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Fallback to 1 hour
};
