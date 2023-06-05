/*
  Warnings:

  - You are about to alter the column `team` on the `players` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `name` on the `teams` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `game` to the `Leagues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game` to the `Players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_team_fkey`;

-- DropIndex
DROP INDEX `Teams_name_key` ON `teams`;

-- DropIndex
DROP INDEX `Teams_slug_key` ON `teams`;

-- AlterTable
ALTER TABLE `leagues` ADD COLUMN `game` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `matches` ADD COLUMN `game` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `players` ADD COLUMN `game` VARCHAR(191) NOT NULL,
    MODIFY `team` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teams` DROP COLUMN `name`,
    ADD COLUMN `game` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Teams_id_key` ON `Teams`(`id`);

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_team_fkey` FOREIGN KEY (`team`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
