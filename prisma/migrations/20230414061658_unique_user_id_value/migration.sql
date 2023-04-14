/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `taskMembers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "taskMembers_userId_key" ON "taskMembers"("userId");
