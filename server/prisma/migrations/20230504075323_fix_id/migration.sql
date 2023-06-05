/*
  Warnings:

  - The primary key for the `players` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `teams` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team1_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team2_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_winner_fkey`;

-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_team_fkey`;

-- AlterTable
ALTER TABLE `matches` ADD COLUMN `name` VARCHAR(191) NULL,
    MODIFY `team1` VARCHAR(191) NOT NULL,
    MODIFY `team2` VARCHAR(191) NOT NULL,
    MODIFY `winner` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `players` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `team` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teams` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team1_fkey` FOREIGN KEY (`team1`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team2_fkey` FOREIGN KEY (`team2`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_winner_fkey` FOREIGN KEY (`winner`) REFERENCES `Teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_team_fkey` FOREIGN KEY (`team`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
