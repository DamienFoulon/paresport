// Libs
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// Config
// Prisma
const prisma = new PrismaClient()
// Bcrypt
const saltRounds = 10
const secretKey = process.env.JWT_SECRET

export async function loginUser(req, res, userData) {
    const user = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    })
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
        if (isPasswordCorrect) {
            if (user.verified) {
                const expirationTime = new Date()
                expirationTime.setHours(expirationTime.getHours() + 1)
                const token = await jwt.sign({
                    signature: user.email,
                    expiration: expirationTime,
                }, secretKey)
                res.cookie('userToken', token)
                res.cookie('userEmail', user.email)
                res.send(token)
            } else {
                res.send('User not verified')
            }
        } else {
            res.send('Incorrect password')
        }
    } else {
        res.send('User not found')
    }
}