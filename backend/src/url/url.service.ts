import { Injectable } from '@nestjs/common';

// Define CreateUrlDto if not already defined elsewhere
export interface CreateUrlDto {
  originalUrl: string;
}

@Injectable()
export class UrlService {
  private urls: Record<string, string> = {};

  create(createUrlDto: CreateUrlDto): { shortCode: string } {
    const shortCode = Math.random().toString(36).substring(2, 8);
    this.urls[shortCode] = createUrlDto.originalUrl;
    return { shortCode };
  }

  resolve(code: string): { originalUrl: string | null } {
    const originalUrl = this.urls[code] || null;
    return { originalUrl };
  }

  findAll(): any[] {
    return Object.entries(this.urls).map(([shortCode, originalUrl]) => ({
      id: 'mock-id',
      originalUrl,
      shortCode,
      createdAt: new Date(),
      expiresAt: new Date(),
      accessCount: 0,
    }));
  }
}