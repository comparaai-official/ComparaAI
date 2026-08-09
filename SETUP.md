# ComparaAI Backend - Kurulum Adımları

Bu dosyalar kendi bilgisayarınızda (Node.js ve Docker kurulu olmalı) çalıştırılmak üzere hazırlandı.

## 1. NestJS projesini oluşturun
```bash
npm i -g @nestjs/cli
nest new comparaai-backend
cd comparaai-backend
```

## 2. Bu klasördeki dosyaları kopyalayın
- `docker-compose.yml` → proje kök dizinine
- `schema.prisma` → proje içinde oluşturacağınız `prisma/schema.prisma` dosyasına

## 3. Docker ile veritabanını ayağa kaldırın
```bash
docker compose up -d
```

## 4. Prisma kurulumu
```bash
npm install prisma @prisma/client
npx prisma init
```
(`npx prisma init` çalıştırdıktan sonra oluşan `prisma/schema.prisma` dosyasının içeriğini bizim hazırladığımız `schema.prisma` ile değiştirin)

## 5. .env dosyanızı ayarlayın
```
DATABASE_URL="postgresql://comparaai:comparaai_dev_pw@localhost:5432/comparaai"
```

## 6. İlk migration
```bash
npx prisma migrate dev --name init
```

## 7. Prisma Client'ı NestJS'e bağlamak için
`npm install @prisma/client` sonrası bir `PrismaService` (PrismaClient'i extend eden) oluşturup
NestJS modüllerinde dependency injection ile kullanacaksınız - bir sonraki adımda bunu birlikte yazabiliriz.

---

## Sıradaki adımlar (önerilen sıra)
1. Bu şemayı migrate edip Prisma Studio ile (`npx prisma studio`) görsel olarak kontrol edin
2. `CategoryModule` ve `ProductModule` (controller + service) oluşturun
3. Basit CRUD endpoint'leri yazın: 
   - `POST /categories`, `GET /categories`
   - `POST /products`, `GET /products?category=&minPrice=&maxPrice=&brand=`
4. Seed script ile birkaç test kategorisi + ürün ekleyin
