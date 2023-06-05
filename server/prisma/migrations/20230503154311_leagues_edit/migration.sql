/*
  Warnings:

  - The primary key for the `leagues` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_leagueId_fkey`;

-- AlterTable
ALTER TABLE `leagues` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `matches` MODIFY `leagueId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `Leagues`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
