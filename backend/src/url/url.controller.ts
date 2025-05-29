// src/url/controllers/url.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UrlService } from '../url/url.service';
import { CreateUrlDto } from '../url/dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get(':code')
  async resolve(@Param('code') code: string) {
    const { originalUrl } = await this.urlService.resolve(code);
    if (!originalUrl) {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
    return { originalUrl };
  }

  @Get()
  async findAll() {
    return this.urlService.findAll();
  }

  @Put(':code')
  async update(
    @Param('code') code: string,
    @Body() updateUrlDto: UpdateUrlDto,
  ): Promise<{ message: string }> {
    return this.urlService.update(code, updateUrlDto);
  }
}
