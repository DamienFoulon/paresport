-- CreateTable
CREATE TABLE `BlacklistTokens` (
    `token` VARCHAR(191) NOT NULL,
    `remainingTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BlacklistTokens_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
