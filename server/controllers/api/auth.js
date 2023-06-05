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
} from '../../utils/login.js'

import {
    createUser,
    createJWT,
    createHash,
    registerUser,
} from '../../utils/register.js'


export async function authVerifyToken(req, res) {
    const { token, email } = req.body;

    async function decodeToken(token) {
        try {
            const decodedToken = await jwt.decode(token)
            return decodedToken ? decodedToken : false
        } catch(e) {
            console.log(e)
            return false
        };
    }

    async function verifyToken(token) {
        try {
            const decodedToken = await jwt.decode(token)
            return decodedToken ? true : false
        } catch(e) {
            console.log(e)
            return false
        }
    }

    async function tokenExpired(token) {
        try {
            const decodedToken = await decodeToken(token)
            return new Date(decodedToken.expiration) < Date.now() ? true : false
        } catch(e) {
            console.log(e)
            return false
        };
    }

    async function tokenMatchMail(token, mail) {
        try {
            const decodedToken = await decodeToken(token)
            return decodedToken.signature === mail
        } catch(e) {
            console.log(e)
        }
    }

    try {
        if (token && email && await decodeToken(token) && await verifyToken(token) && !await tokenExpired(token) && await tokenMatchMail(token, email)) {
            const decodedToken = await decodeToken(token);
            res.status(200).json({ token: decodedToken, isValid: true });
        } else {
            res.status(200).json({ isValid: false });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
export async function authLogin(req, res) {
    const { email, password } = req.body
    const userData = {
        email: email,
        password: password,
    }
    loginUser(req, res, userData)
}
export async function authRegister(req, res) {
    const { email, password, firstname, lastname, birthdate, username } = req.body

    let tokenData = {
        signature: email,
        expiration: '1h',
    }

    let hashData = {
        data: password,
        salt: saltRounds,
    }

    let userData = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        username: username,
    }

    registerUser(req, res, tokenData, hashData, userData)
}
export async function authValidate(req, res) {
    const userToken = await req.query.token
    const decodedToken = await jwt.verify(userToken, secretKey)
    const user = await prisma.user.findUnique({
        where: {
            email: decodedToken.signature
        }
    })

    if (user) {
        try {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    verified: true
                }
            })
            res.send(true)
        } catch(e) {
            console.log(e)
            res.send(false)
        }
    } else {
        res.send(false)
    }
}
export async function authLogout(req, res) {
    let { token } = req.body
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, secretKey)
            res.cookie('userToken', null)
            let tokenToStore = token
            const blacklistToken = await prisma.blacklist_Tokens.create({
                data: {
                    token: token,
                    remainingTime: new Date(decodedToken.expiration),
                },
            })

        } catch(e) {
            console.log(e)
        }
    }
    res.send('Logged out')
}
export async function authResetPassword(req, res) {
    const { email, newPassword } = req.body
    if(email) {
        const user = await prisma.user.update({
            where: { email: email },
            data: {
                password: await createHash(newPassword, saltRounds)
            }
        })
    }
    res.json({ message: 'Password changed' })
}
export async function authDeleteAccount(req, res) {
    const { email } = req.body
    const userEmail = req.cookies.userEmail.replace('%40', '@')
    if(email && email === userEmail) {
        try {
            const user = await prisma.user.delete({
                where: { id: await prisma.user.findUnique({ where: { email: email } }).then((user) => { return user.id }) }
            })
            res.json({ message: 'Account deleted' })
        } catch(e) {
            console.log(e)
            res.status(400).json({ message: 'Account not found or error', error: e })
        }
    } else if (email !== userEmail) {
        res.status(400).json({ message: 'The provided email doesn\'t fit with your account' })
    }
    else {
        res.status(400).json({ message: 'You must provide an email' })
    }
}
export async function authGetCredentials(req, res) {
    const { token } = req.body
    const email = await jwt.decode(token).signature
    if(email) {
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        const bets = await prisma.bets.findMany({
            where: { userId: user.id },
        }).then(async (bets) => {
            const mappedBets = await Promise.all(bets.map(async (bet) => {
                const match = await prisma.matches.findUnique({
                    where: { id: bet.match }
                }).then(async (match) => {
                    return {
                        id: match.id,
                        name: match.name,
                        team1: {
                            id: match.team1,
                            name: await prisma.teams.findUnique({
                                where: { id: match.team1 }
                            }).then((team) => { return team.name }),
                            slug: await prisma.teams.findUnique({
                                where: { id: match.team1}
                            }).then((team) => { return team.slug })
                        },
                        team2: {
                            id: match.team2,
                            name: await prisma.teams.findUnique({
                                where: { id: match.team2 }
                            }).then((team) => { return team.name }),
                            slug: await prisma.teams.findUnique({
                                where: { id: match.team2}
                            }).then((team) => { return team.slug })
                        },
                        teamBet: {
                            id: bet.team,
                            name: await prisma.teams.findUnique({
                                where: { id: bet.team }
                            }).then((team) => { return team.name }),
                            slug: await prisma.teams.findUnique({
                                where: { id: bet.team}
                            }).then((team) => { return team.slug })
                        },
                        date: match.date,
                        winner: match.winner,
                    }
                })
                return {
                    id: bet.id,
                    match: {
                        id: bet.match,
                        name: match.name,
                    },
                    teams: {
                        0: {
                            id: match.team1.id,
                            name: match.team1.name,
                            slug: match.team1.slug
                        },
                        1: {
                            id: match.team2.id,
                            name: match.team2.name,
                            slug: match.team2.slug
                        }
                    },
                    bet: match.teamBet,
                    amount: bet.amount,
                    result: bet.result,
                };
            }));

            return mappedBets;
        });
        if(user) {
            res.json({ message: 'User found', user: {
                    email: user.email,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    coins: user.coins,
                    lastCoinsReceived: user.lastCoinsReceived,
                    bets: bets,
                } })
        } else {
            res.status(400).json({ message: 'User not found' })
        }
    } else {
        res.status(400).json({ message: 'You must provide an email' })
    }
}