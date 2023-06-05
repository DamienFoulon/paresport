/*
  Warnings:

  - The primary key for the `matches` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `bets` DROP FOREIGN KEY `Bets_match_fkey`;

-- AlterTable
ALTER TABLE `bets` MODIFY `match` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `matches` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Bets` ADD CONSTRAINT `Bets_match_fkey` FOREIGN KEY (`match`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
