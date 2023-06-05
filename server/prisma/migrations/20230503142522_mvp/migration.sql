-- AlterTable
ALTER TABLE `matches` ADD COLUMN `mvp` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_mvp_fkey` FOREIGN KEY (`mvp`) REFERENCES `Players`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;
