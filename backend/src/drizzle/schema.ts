import { mysqlTable, varchar, datetime, int } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const urls = mysqlTable('urls', {
  id: varchar('id', { length: 36 }).primaryKey(),
  originalUrl: varchar('original_url', { length: 2048 }).notNull(),
  shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
  createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  expiresAt: datetime('expires_at').notNull(),
  accessCount: int('access_count').notNull().default(0),
});
