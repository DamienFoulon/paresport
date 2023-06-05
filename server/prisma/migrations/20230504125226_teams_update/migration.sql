-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_leagueId_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team1_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team2_fkey`;

-- AlterTable
ALTER TABLE `matches` MODIFY `leagueId` VARCHAR(191) NULL,
    MODIFY `team1` VARCHAR(191) NULL,
    MODIFY `team2` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `Leagues`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team1_fkey` FOREIGN KEY (`team1`) REFERENCES `Teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team2_fkey` FOREIGN KEY (`team2`) REFERENCES `Teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
