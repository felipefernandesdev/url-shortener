// src/url/url.module.ts
import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
