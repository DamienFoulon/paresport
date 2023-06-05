// Libs
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

// Utils
import {
    sendMailValidation
} from './nodemailer.js'

// Config
// Dotenv
dotenv.config()
// Prisma
const prisma = new PrismaClient()
// Bcrypt
const saltRounds = 10
const secretKey = process.env.JWT_SECRET

export async function createUser(req, res, hash, userData, token, debug) {
    try {
        let password = hash
        let userCount = await prisma.user.count({
            where: {
                OR: [
                    {
                        email: userData.email,
                    },
                    {
                        username: userData.username,
                    }
                ]
            }
        })

        if(!userCount > 0) {
            const user = await prisma.user.create({
                data: {
                    email: userData.email,
                    password: password,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    birthdate: userData.birthdate,
                    username: userData.username,
                },
            })

            sendMailValidation(await createJWT(userData.email, '1h'), userData.email)
            res.json({ message: 'User created' })
        } else {
            res.status(400).json({ message: 'User already exists' })
        }
        switch (debug) {
            case true:
                console.log('User created: ' + user)
                break
            default:
                break
        }
    } catch (e) {
        console.log(e)
    }
}

export async function createJWT(signature, expiration, debug) {
    try {
        const token = await jwt.sign({ signature }, secretKey, {
            expiresIn: expiration,
        })
        return token
        switch (debug) {
            case true:
                console.log('JWT created: ' + token)
                break
            default:
                break
        }
    } catch (e) {
        console.log(e)
    }
}

export async function createHash(data, salt, debug) {
    try {
        const hash = new Promise((resolve, reject) => {
            bcrypt.hash(data, salt, (err, hash) => {
                if (err) reject(err)
                resolve(hash)
            })
        })
        return hash
        switch (debug) {
            case true:
                console.log('Hash created: ' + hash)
                break
            default:
                break
        }
    } catch (e) {
        console.log(e)
    }
}

export async function registerUser(req, res, tokenData, hashData, userData) {
    let token = await createJWT(tokenData.signature, tokenData.expiration)
    let hash = await createHash(hashData.data, hashData.salt)
    let user = await createUser(req, res, hash, userData)
    return { token }
}