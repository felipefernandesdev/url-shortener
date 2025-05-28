import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DrizzleService {
  public db;

  constructor() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL não foi definida no .env');
    }

    this.db = drizzle(mysql.createPool(dbUrl));
  }
}