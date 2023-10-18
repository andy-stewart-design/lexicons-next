-- CreateTable
CREATE TABLE "Icon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path_outline" TEXT,
    "path_trans" TEXT,
    "path_solid" TEXT,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IconToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Icon_name_key" ON "Icon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_IconToTag_AB_unique" ON "_IconToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_IconToTag_B_index" ON "_IconToTag"("B");

-- AddForeignKey
ALTER TABLE "_IconToTag" ADD CONSTRAINT "_IconToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Icon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IconToTag" ADD CONSTRAINT "_IconToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
