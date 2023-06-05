/*
  Warnings:

  - Added the required column `team` to the `Bets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bets` ADD COLUMN `team` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Bets` ADD CONSTRAINT `Bets_team_fkey` FOREIGN KEY (`team`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
