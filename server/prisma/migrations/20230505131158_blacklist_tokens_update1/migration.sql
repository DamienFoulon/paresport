/*
  Warnings:

  - You are about to alter the column `remainingTime` on the `blacklist_tokens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `blacklist_tokens` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `remainingTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
