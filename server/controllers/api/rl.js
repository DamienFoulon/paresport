// Libs
import dotenv from 'dotenv'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import pandascore from '../../utils/pandascore.js'

// Config
dotenv.config()
const prisma = new PrismaClient()

export function rl(req, res) {
    res.send('This is Rocket League API section')
}

export function rlMatches(req, res) {
    let sort = req.query.sort

    let dota2Matches = pandascore(
        `https://api.pandascore.co/rl/matches`
    )

    switch (sort) {
        default:
            dota2Matches.then((data) => {
                res.json(data)
            })
            break

        case 'upcoming':
            dota2Matches.then((data) => {
                res.json(
                    data
                        .sort((a, b) => {
                            return new Date(a.begin_at) - new Date(b.begin_at)
                        })
                        .filter((match) => {
                            return new Date(match.begin_at) > new Date()
                        })
                )
            })
            break
    }
}

export function rlLeagues(req, res) {
    let dota2Leagues = pandascore(
        `https://api.pandascore.co/rl/leagues`
    )

    dota2Leagues.then((data) => {
        res.json(data)
    })
}