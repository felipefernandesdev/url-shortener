import { Module } from '@nestjs/common';
import { UrlController } from '../url/url.controller';
import { UrlService } from '../url/url.service';
import { DrizzleService } from '../drizzle/drizzle.service';
import { DRIZZLE_TOKEN } from '../drizzle/drizzle.constants';

@Module({
  controllers: [UrlController],
  providers: [
    UrlService,
    DrizzleService,
    {
      provide: DRIZZLE_TOKEN,
      useFactory: (drizzleService: DrizzleService) => drizzleService.db,
      inject: [DrizzleService],
    },
  ],
})
export class UrlModule {}