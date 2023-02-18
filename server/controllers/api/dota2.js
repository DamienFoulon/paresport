// Utils
import pandascore from '../../utils/pandascore.js'

export function dota2(req, res) {
    res.send('This is Dota 2 API section')
}

export function dota2Matches(req, res) {
    let sort = req.query.sort

    let dota2Matches = pandascore(
        `https://api.pandascore.co/dota2/matches?token=${process.env.PANDASCORE_TOKEN}`
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

export function dota2Leagues(req, res) {
    let dota2Leagues = pandascore(
        `https://api.pandascore.co/dota2/leagues?token=${process.env.PANDASCORE_TOKEN}`
    )

    dota2Leagues.then((data) => {
        res.json(data)
    })
}
