/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `editedTitle` on the `PullRequest` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `PullRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PullRequest" DROP COLUMN "createdAt",
DROP COLUMN "editedTitle",
DROP COLUMN "reviewedAt",
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;
