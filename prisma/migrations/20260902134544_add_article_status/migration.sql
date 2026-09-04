-- DropIndex
DROP INDEX "Article_isPublished_idx";

-- DropIndex
DROP INDEX "Article_publishedAt_idx";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';
