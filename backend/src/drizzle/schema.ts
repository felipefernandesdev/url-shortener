import { mysqlTable, varchar, datetime, int } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const urls = mysqlTable('urls', {
  shortCode: varchar('short_code', { length: 10 }).primaryKey(),
  originalUrl: varchar('original_url', { length: 255 }).notNull(),
  createdAt: datetime('created_at').default(sql`now()`).notNull(), // Obrigatório
  expiresAt: datetime('expires_at'), // Opcional
  accessCount: int('access_count').default(0),
});
