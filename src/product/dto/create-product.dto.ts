export class CreateProductDto {
    name: string;
    brand: string;
    categoryId: string;
    price: number;
    priceMax?: number;
    imageUrl?: string;
    description?: string;
    specs: Record<string, any>;
}