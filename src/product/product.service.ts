import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        specs: createProductDto.specs as Prisma.InputJsonValue,
      },
    });
  }

  async findAll(filters: {
    categoryId?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    minRam?: string;
    minStorage?: string;
    minBattery?: string;
  }) {
    const { categoryId, brand, minPrice, maxPrice, minRam, minStorage, minBattery } = filters;

    const products = await this.prisma.product.findMany({
      where: {
        isActive: true,
        ...(categoryId && { categoryId }),
        ...(brand && { brand }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice && { gte: Number(minPrice) }),
                ...(maxPrice && { lte: Number(maxPrice) }),
              },
            }
          : {}),
      },
      include: { category: true },
    });

    return products.filter((p) => {
      const specs = (p.specs as Record<string, any>) || {};

      if (minRam && (!specs.ramGb || specs.ramGb < Number(minRam))) {
        return false;
      }
      if (minStorage && (!specs.storageGb || specs.storageGb < Number(minStorage))) {
        return false;
      }
      if (minBattery && (!specs.batteryMah || specs.batteryMah < Number(minBattery))) {
        return false;
      }
      return true;
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto as Prisma.ProductUpdateInput,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}