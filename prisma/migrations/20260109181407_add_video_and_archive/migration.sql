-- CreateTable
CREATE TABLE "photograph_keywords" (
    "photographId" TEXT NOT NULL,
    "keyWordId" TEXT NOT NULL,

    CONSTRAINT "photograph_keywords_pkey" PRIMARY KEY ("photographId","keyWordId")
);

-- CreateTable
CREATE TABLE "photograph_nine_blocks" (
    "photographId" TEXT NOT NULL,
    "nineBlockId" TEXT NOT NULL,

    CONSTRAINT "photograph_nine_blocks_pkey" PRIMARY KEY ("photographId","nineBlockId")
);

-- CreateTable
CREATE TABLE "video_keywords" (
    "videoId" TEXT NOT NULL,
    "keyWordId" TEXT NOT NULL,

    CONSTRAINT "video_keywords_pkey" PRIMARY KEY ("videoId","keyWordId")
);

-- CreateTable
CREATE TABLE "video_nine_blocks" (
    "videoId" TEXT NOT NULL,
    "nineBlockId" TEXT NOT NULL,

    CONSTRAINT "video_nine_blocks_pkey" PRIMARY KEY ("videoId","nineBlockId")
);

-- CreateTable
CREATE TABLE "photographs" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "photoDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photographs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "videoDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archiveIndex" (
    "id" SERIAL NOT NULL,
    "Class" TEXT NOT NULL,
    "WebName" TEXT NOT NULL,
    "OrgName" TEXT NOT NULL,
    "OrgWebLink" TEXT NOT NULL,

    CONSTRAINT "archiveIndex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "photographs_photoDate_idx" ON "photographs"("photoDate");

-- CreateIndex
CREATE INDEX "videos_videoDate_idx" ON "videos"("videoDate");

-- AddForeignKey
ALTER TABLE "photograph_keywords" ADD CONSTRAINT "photograph_keywords_photographId_fkey" FOREIGN KEY ("photographId") REFERENCES "photographs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photograph_keywords" ADD CONSTRAINT "photograph_keywords_keyWordId_fkey" FOREIGN KEY ("keyWordId") REFERENCES "KeyWords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photograph_nine_blocks" ADD CONSTRAINT "photograph_nine_blocks_photographId_fkey" FOREIGN KEY ("photographId") REFERENCES "photographs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photograph_nine_blocks" ADD CONSTRAINT "photograph_nine_blocks_nineBlockId_fkey" FOREIGN KEY ("nineBlockId") REFERENCES "NineBlocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_keywords" ADD CONSTRAINT "video_keywords_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_keywords" ADD CONSTRAINT "video_keywords_keyWordId_fkey" FOREIGN KEY ("keyWordId") REFERENCES "KeyWords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_nine_blocks" ADD CONSTRAINT "video_nine_blocks_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_nine_blocks" ADD CONSTRAINT "video_nine_blocks_nineBlockId_fkey" FOREIGN KEY ("nineBlockId") REFERENCES "NineBlocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
