/*
  Warnings:

  - You are about to drop the column `modelId` on the `Tip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_modelId_fkey";

-- AlterTable
ALTER TABLE "Tip" DROP COLUMN "modelId",
ADD COLUMN     "modelName" TEXT,
ADD COLUMN     "yearFrom" INTEGER,
ADD COLUMN     "yearTo" INTEGER;

-- CreateIndex
CREATE INDEX "Tip_modelName_category_idx" ON "Tip"("modelName", "category");
