-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "segment" TEXT NOT NULL DEFAULT 'orta',
ALTER COLUMN "priceMax" SET DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "Product_segment_idx" ON "Product"("segment");
