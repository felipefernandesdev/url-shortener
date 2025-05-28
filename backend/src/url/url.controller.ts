import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get(':code')
  async resolve(@Param('code') code: string) {
    return this.urlService.resolve(code);
  }

  @Get()
  async findAll() {
    return this.urlService.findAll();
  }
}