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
    createApplicant,
    createSdkToken,
    getApplicant,
    createCheck,
} from '../utils/onfido.js'

export function index(req, res) {
    res.send('Hello World!')
}

export async function registerController(req, res) {
    let userData = {
        firstName: 'Damien2',
        lastName: 'Foulon',
        dob: '2002-12-23',
        address: {
            postcode: '72000',
            country: 'FRA',
        },
    }

    let user = await createApplicant(userData)
    let sdkToken = await createSdkToken(user.id)

    res.json({ user, sdkToken })

    // const { email, password, firstname, lastname, birthdate, username } =
    //     req.body
    //
    // async function createUser(hash) {
    //     let password = hash
    //     const user = await prisma.user.create({
    //         data: {
    //             email,
    //             password,
    //             firstname,
    //             lastname,
    //             birthdate,
    //             username,
    //         },
    //     })
    // }
    //
    // if (email && password) {
    //     const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })
    //     bcrypt.genSalt(saltRounds, (err, salt) => {
    //         bcrypt.hash(password, salt, (err, hash) => {
    //             createUser(hash)
    //         })
    //     })
    //     res.json({ token })
    // } else {
    //     res.status(400).json({ message: 'Bad Request' })
    // }
}

export async function onfindoCheckController(req, res) {
    const { applicantId } = req.body
    console.log(await createCheck(applicantId))
    res.json(await createCheck(applicantId))
}
