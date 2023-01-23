// Utils
import pandascore from '../../utils/pandascore.js'

export function global(req, res) {
    res.send('This is global API section')
}

export function globalMatches(req, res) {
    let sort = req.query.sort

    let globalMatches = pandascore(
        `https://api.pandascore.co/matches?token=${process.env.PANDASCORE_TOKEN}`
    )

    switch (sort) {
        default:
            globalMatches.then((data) => {
                res.json(data)
            })
            break

        case 'upcoming':
            globalMatches.then((data) => {
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
    }
}

export function globalLeagues(req, res) {
    res.send('This is global leagues API section')
}
