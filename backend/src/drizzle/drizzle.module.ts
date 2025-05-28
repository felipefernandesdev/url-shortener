// src/drizzle/drizzle.module.ts
import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

export const dbProvider = {
  provide: 'DRIZZLE',
  useFactory: async (configService: ConfigService) => {
    const connection = await mysql.createConnection({
      uri: configService.get('DATABASE_URL'),
    });
    return drizzle(connection);
  },
  inject: [ConfigService],
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DrizzleModule {}
