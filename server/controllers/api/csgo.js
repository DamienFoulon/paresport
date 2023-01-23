// Utils
import pandascore from '../../utils/pandascore.js'
export function csgo(req, res) {
    res.send('This is CS:GO API section')
}

export function csgoMatches(req, res) {
    let sort = req.query.sort

    let csgoMatches = pandascore(
        `https://api.pandascore.co/csgo/matches?token=${process.env.PANDASCORE_TOKEN}`
    )

    switch (sort) {
        default:
            csgoMatches.then((data) => {
                res.json(data)
            })
            break

        case 'upcoming':
            csgoMatches.then((data) => {
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

export function csgoLeagues(req, res) {
    let csgoLeagues = pandascore(
        `https://api.pandascore.co/csgo/leagues?token=${process.env.PANDASCORE_TOKEN}`
    )

    csgoLeagues.then((data) => {
        res.json(data)
    })
}
