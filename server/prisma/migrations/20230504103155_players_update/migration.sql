-- DropForeignKey
ALTER TABLE `teams` DROP FOREIGN KEY `Teams_players_fkey`;

-- AlterTable
ALTER TABLE `teams` MODIFY `players` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Teams` ADD CONSTRAINT `Teams_players_fkey` FOREIGN KEY (`players`) REFERENCES `Players`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;
