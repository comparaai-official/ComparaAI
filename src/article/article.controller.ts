import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: {
    title: string;
    slug: string;
    summary?: string;
    content: string;
    imageUrl?: string;
    author?: string;
    isPublished?: boolean;
    publishedAt?: string;
  }) {
    return this.articleService.create({
      ...data,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt)
        : undefined,
    });
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get('published')
  findPublished() {
    return this.articleService.findPublished();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    data: {
      title?: string;
      slug?: string;
      summary?: string;
      content?: string;
      imageUrl?: string;
      author?: string;
      isPublished?: boolean;
      publishedAt?: string;
    },
  ) {
    return this.articleService.update(id, {
      ...data,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt)
        : undefined,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}