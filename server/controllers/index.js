// Libs
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

// Config
// Dotenv
dotenv.config()
// Prisma
const prisma = new PrismaClient()
// Bcrypt
const saltRounds = 10
const secretKey = process.env.JWT_SECRET

// Utils
import {
    loginUser
} from '../utils/login.js'

import {
    createUser,
    createJWT,
    createHash,
    registerUser,
} from '../utils/register.js'

export function index(req, res) {
    res.send('Hello World!')
}
export async function onfindoCheckController(req, res) {
    const { applicantId } = req.body
    console.log(await createCheck(applicantId))
    res.json(await createCheck(applicantId))
}
export async function redeemCoinsController(req, res) {
    const { token } = req.body
    if( token ) {
        const decodedToken = await jwt.verify(token, secretKey)
        const user = await prisma.user.findUnique({
            where: {
                email: decodedToken.signature
            }
        })
        if (user) {
            const lastRedeem = user.lastCoinsReceived;
            const now = new Date();
            const diff = now.getTime() - lastRedeem.getTime();
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

            if (diffDays < 2) {
                res.send('User already redeemed coins today')
                return;
            } else {
                try {
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            lastCoinsReceived: now,
                            coins: user.coins + 100
                        }
                    })
                    res.send(`Coins redeemed! You now have ${user.coins + 100} coins. Next redeem at ${new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000)}`)
                } catch(e) {
                    console.log(e)
                    res.send('An error occurred')
                }
            }
        } else {
            res.send('User not found')
        }
    } else {
        res.send('No token provided')
    }
}
export async function placeBetController(req, res) {
    const { matchId, teamId, amount } = req.body
    const token = await req.cookies.userToken
    console.log(token)
    if( token ) {
        const decodedToken = await jwt.verify(token, secretKey)
        const user = await prisma.user.findUnique({
            where: { email: decodedToken.signature }
        })
        if( user ) {
            if(matchId, teamId, amount) {
                let userCoins = user.coins
                if(userCoins < amount) {
                    res.status(400).json({ message: 'Not enough coins.' })
                    return;
                } else {
                    try {
                        const bet = await prisma.bets.create({
                            data: {
                                userId: user.id,
                                match: matchId,
                                team: teamId,
                                amount: amount,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            }
                        })
                        await Promise.all([bet])
                        const updateCoins = await prisma.user.update({
                            where: { id: user.id },
                            data: {
                                coins: userCoins - amount
                            }
                        })
                        res.status(200).json({ message: 'Bet placed.' })
                    } catch(e) {
                        console.log(e)
                        res.status(400).json({ message: 'An error occurred.' })
                    }
                }
            } else {
                res.status(400).json({ message: 'Missing data.' })
            }
        }
    }
}