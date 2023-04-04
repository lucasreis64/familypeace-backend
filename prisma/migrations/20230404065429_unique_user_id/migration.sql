/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "enrollment_userId_key" ON "enrollment"("userId");
