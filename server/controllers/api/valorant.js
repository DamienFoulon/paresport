// Libs
import dotenv from 'dotenv'

// Utils
import pandascore from '../../utils/pandascore.js'

// Config
dotenv.config()

export function valorant(req, res) {
    res.send('This is Valorant API section')
}

export function valorantMatches(req, res) {
    let sort = req.query.sort

    let valorantMatches = pandascore(
        `https://api.pandascore.co/valorant/matches?token=${process.env.PANDASCORE_TOKEN}`
    )

    switch (sort) {
        default:
            valorantMatches.then((data) => {
                res.json(data)
            })
            break

        case 'upcoming':
            valorantMatches.then((data) => {
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

        case 'live':
            valorantMatches.then((data) => {
                data.map((match) => {
                    res.json(match.id)
                })
            })
            break
    }
}

export function valorantLeagues(req, res) {
    let valorantLeagues = pandascore(
        `https://api.pandascore.co/valorant/leagues?token=${process.env.PANDASCORE_TOKEN}`
    )
    valorantLeagues.then((data) => {
        res.json(data)
    })
}
