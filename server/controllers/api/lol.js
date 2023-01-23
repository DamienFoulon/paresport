// Utils
import pandascore from '../../utils/pandascore.js'

export function lol(req, res) {
    res.send('This is League of Legends API section')
}

export function lolMatches(req, res) {
    let sort = req.query.sort

    let lolMatches = pandascore(
        `https://api.pandascore.co/lol/matches?token=${process.env.PANDASCORE_TOKEN}`
    )

    switch (sort) {
        default:
            lolMatches.then((data) => {
                res.json(data)
            })
            break

        case 'upcoming':
            lolMatches.then((data) => {
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

export function lolLeagues(req, res) {
    let lolLeagues = pandascore(
        `https://api.pandascore.co/lol/leagues?token=${process.env.PANDASCORE_TOKEN}`
    )
    lolLeagues.then((data) => {
        res.json(data)
    })
}
