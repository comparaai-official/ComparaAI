export class CreateProductDto {
  name: string;
  brand: string;
  categoryId: string;

  // Fiyat artık admin'den alınmıyor.
  // Eski API uyumluluğu için opsiyonel bırakıyoruz.
  price?: number;
  priceMax?: number;

  imageUrl?: string;
  description?: string;

  segment: "ekonomik" | "orta" | "ust";

  specs: Record<string, any>;
}