import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    title: string;
    slug: string;
    summary?: string;
    content: string;
    imageUrl?: string;
    author?: string;
    isPublished?: boolean;
    publishedAt?: Date;
  }) {
    return this.prisma.article.create({
      data,
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findPublished() {
    return this.prisma.article.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.article.findUnique({
      where: { slug },
    });
  }

  update(id: string, data: Partial<{
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    author: string;
    isPublished: boolean;
    publishedAt: Date;
  }>) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}