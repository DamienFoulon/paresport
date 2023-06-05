/*
  Warnings:

  - You are about to drop the column `matchId` on the `bets` table. All the data in the column will be lost.
  - Added the required column `match` to the `Bets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bets` DROP COLUMN `matchId`,
    ADD COLUMN `match` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Leagues` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,
    `region` VARCHAR(191) NULL,

    UNIQUE INDEX `Leagues_name_key`(`name`),
    UNIQUE INDEX `Leagues_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matches` (
    `id` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `leagueId` INTEGER NOT NULL,
    `tournamentName` VARCHAR(191) NULL,
    `tournamentSeason` VARCHAR(191) NULL,
    `strategy` VARCHAR(191) NULL,
    `team1` INTEGER NOT NULL,
    `team1Score` INTEGER NULL,
    `team2` INTEGER NOT NULL,
    `team2Score` INTEGER NULL,
    `winner` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teams` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `players` VARCHAR(191) NOT NULL,
    `records` VARCHAR(191) NULL,
    `seasonRecords` VARCHAR(191) NULL,

    UNIQUE INDEX `Teams_name_key`(`name`),
    UNIQUE INDEX `Teams_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Players` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `team` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Players_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bets` ADD CONSTRAINT `Bets_match_fkey` FOREIGN KEY (`match`) REFERENCES `Matches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `Leagues`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team1_fkey` FOREIGN KEY (`team1`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team2_fkey` FOREIGN KEY (`team2`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_winner_fkey` FOREIGN KEY (`winner`) REFERENCES `Teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teams` ADD CONSTRAINT `Teams_players_fkey` FOREIGN KEY (`players`) REFERENCES `Players`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_team_fkey` FOREIGN KEY (`team`) REFERENCES `Teams`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;
