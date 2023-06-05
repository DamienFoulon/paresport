/*
  Warnings:

  - Made the column `lastCoinsReceived` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `coins` INTEGER NOT NULL DEFAULT 100,
    MODIFY `lastCoinsReceived` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
