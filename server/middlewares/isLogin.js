// Libs
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Config
// Dotenv
dotenv.config()
// Prisma
const prisma = new PrismaClient()
// JWT
const secretKey = process.env.JWT_SECRET

export async function isLogin(req, res, next) {
    let { userToken, userEmail } = await req.cookies
    userEmail = userEmail.replace('%40', '@')
    if (userToken) {
        try {
            const decodedToken = await jwt.verify(userToken, secretKey)
            const isBlacklisted = await prisma.blacklist_Tokens.findUnique({
                where: {
                    token: userToken
                }
            })
            if (isBlacklisted) {
                let error = new Error('Token is blacklisted')
                error.status = 401
                next(error)
            } else if (decodedToken && decodedToken.signature === userEmail) {
                next()
            } else {
                let error = new Error('Token is invalid')
                error.status = 401
                next(error)
            }
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}