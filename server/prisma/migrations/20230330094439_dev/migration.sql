/*
  Warnings:

  - You are about to drop the `blacklisttokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `blacklisttokens`;

-- CreateTable
CREATE TABLE `Blacklist_Tokens` (
    `token` VARCHAR(191) NOT NULL,
    `remainingTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Blacklist_Tokens_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
