/*
  Warnings:

  - You are about to drop the `photograph_keywords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "photograph_keywords" DROP CONSTRAINT "photograph_keywords_keyWordId_fkey";

-- DropForeignKey
ALTER TABLE "photograph_keywords" DROP CONSTRAINT "photograph_keywords_photographId_fkey";

-- DropTable
DROP TABLE "photograph_keywords";

-- CreateTable
CREATE TABLE "photograph_cake_categories" (
    "photographId" TEXT NOT NULL,
    "cakeCategoryId" TEXT NOT NULL,

    CONSTRAINT "photograph_cake_categories_pkey" PRIMARY KEY ("photographId","cakeCategoryId")
);

-- CreateTable
CREATE TABLE "video_cake_categories" (
    "videoId" TEXT NOT NULL,
    "cakeCategoryId" TEXT NOT NULL,

    CONSTRAINT "video_cake_categories_pkey" PRIMARY KEY ("videoId","cakeCategoryId")
);

-- AddForeignKey
ALTER TABLE "photograph_cake_categories" ADD CONSTRAINT "photograph_cake_categories_photographId_fkey" FOREIGN KEY ("photographId") REFERENCES "photographs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photograph_cake_categories" ADD CONSTRAINT "photograph_cake_categories_cakeCategoryId_fkey" FOREIGN KEY ("cakeCategoryId") REFERENCES "CakeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_cake_categories" ADD CONSTRAINT "video_cake_categories_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_cake_categories" ADD CONSTRAINT "video_cake_categories_cakeCategoryId_fkey" FOREIGN KEY ("cakeCategoryId") REFERENCES "CakeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
