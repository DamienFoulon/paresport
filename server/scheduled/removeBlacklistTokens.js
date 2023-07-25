import cron from 'node-cron';
import { PrismaClient } from '@prisma/client'

// Config
const prisma = new PrismaClient()

export async function scheduledRemoveBlacklistTokens() {
    cron.schedule('*/25 * * * *', async () => {
        const tokens = await prisma.blacklist_Tokens.findMany().then((tokens) => {
            tokens.forEach(async (token) => {
                if(token.remainingTime < new Date()) {
                    await prisma.blacklist_Tokens.delete({
                        where: {
                            token: token.token
                        }
                    })
                }
            })
        })
    })
}