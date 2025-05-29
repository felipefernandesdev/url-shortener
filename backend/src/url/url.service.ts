import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import * as schema from '../drizzle/schema';
import { CreateUrlDto } from '../url/dto/create-url.dto';
import { DRIZZLE_TOKEN } from '../drizzle/drizzle.constants';
import { UpdateUrlDto } from './dto/update-url.dto';

@Injectable()
export class UrlService {
  constructor(@Inject(DRIZZLE_TOKEN) private readonly db: MySql2Database) {}

  async create(createUrlDto: CreateUrlDto): Promise<{ shortCode: string }> {
    const shortCode = Math.random().toString(36).substring(2, 8);

    await this.db.insert(schema.urls).values({
      shortCode,
      originalUrl: createUrlDto.originalUrl,
      expiresAt: undefined,
    });

    return { shortCode };
  }

  async resolve(code: string): Promise<{ originalUrl: string | null }> {
    const result = await this.db
      .select()
      .from(schema.urls)
      .where(eq(schema.urls.shortCode, code))
      .limit(1);

    const originalUrl = result[0]?.originalUrl ?? null;
    await this.db
      .update(schema.urls)
      .set({ accessCount: (result[0]?.accessCount || 0) + 1 })
      .where(eq(schema.urls.shortCode, code));

    return { originalUrl };
  }

  async findAll(): Promise<any[]> {
    const results = await this.db.select().from(schema.urls);
    return results.map((record) => ({
      id: record.shortCode,
      originalUrl: record.originalUrl,
      shortCode: record.shortCode,
      createdAt: record.createdAt,
      expiresAt: record.expiresAt,
      accessCount: record.accessCount || 0,
    }));
  }

  async update(
    code: string,
    updateUrlDto: UpdateUrlDto,
  ): Promise<{ result: any; message: string }> {
    const result = await this.db
      .update(schema.urls)
      .set({
        originalUrl: updateUrlDto.originalUrl,
        expiresAt: updateUrlDto.expiresAt,
      })
      .where(eq(schema.urls.shortCode, code));

    return {
      result,
      message: `URL with code "${code}" has been updated successfully.`,
    };
  }
}
