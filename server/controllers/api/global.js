// Utils
import pandascore from '../../utils/pandascore.js'

export function global(req, res) {
    res.send('This is global API section')
}

export function globalMatches(req, res) {
    let sort = req.query.sort

    let globalMatches = pandascore(
        `https://api.pandascore.co/matches`
    )

    switch (sort) {
        default:
            globalMatches.then((data) => {
                const matchData = data.map((match) => {
                    switch(match.status) {
                        case 'not_started':
                            match.status = 'upcoming'
                            break
                        case 'running':
                            match.status = 'live'
                            break
                        case 'finished':
                            match.status = 'completed'
                    }

                    return {
                        id: match.id.toString(),
                        name: match.league.name + ' - ' + match.serie.full_name + ' - ' + match.name,
                        startTime: match.begin_at,
                        game: match.videogame.slug,
                        status: match.status,
                        league: {
                            id: match.league.id.toString(),
                            name: match.league.name,
                            slug: match.league.slug,
                            image: match.league.image_url,
                        },
                        tournamentName: match.serie.slug,
                        tournamentSeason: match.serie.year,
                        team1: {
                            id: match.opponents ? match.opponents[0] ? match.opponents[0].opponent.id ? match.opponents[0].opponent.id.toString() : null : null : null,
                            name: match.opponents ? match.opponents[0] ? match.opponents[0].opponent.name ? match.opponents[0].opponent.name : null : null : null,
                            slug: match.opponents ? match.opponents[0] ? match.opponents[0].opponent.acronym ? match.opponents[0].opponent.acronym : match.opponents[0].opponent.name : null : null,
                            image: match.opponents ? match.opponents[0] ? match.opponents[0].opponent.image_url ? match.opponents[0].opponent.image_url : null : null : null,
                        },
                        team1Score: match.results ? match.results[0] ? match.results[0] ? match.results[0].score : null : null : null,
                        team2: {
                            id: match.opponents ? match.opponents[1] ? match.opponents[1].opponent.id ? match.opponents[1].opponent.id.toString() : null : null : null,
                            name: match.opponents ? match.opponents[1] ? match.opponents[1].opponent.name ? match.opponents[1].opponent.name : null : null : null,
                            slug: match.opponents ? match.opponents[1] ? match.opponents[1].opponent.acronym ? match.opponents[1].opponent.acronym : match.opponents[1].opponent.name : null : null,
                            image: match.opponents ? match.opponents[1] ? match.opponents[1].opponent.image_url ? match.opponents[1].opponent.image_url : null : null : null,
                        },
                        team2Score: match.results ? match.results[1] ? match.results[1] ? match.results[1].score : null : null : null,
                        winner: match.winner ? match.winner.id ? match.winner : null : null,
                    }
                })
                res.json(matchData)
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
            break

        case 'finished':
            globalMatches.then((data) => {
                res.json(
                    data
                        .sort((a, b) => {
                            return new Date(b.begin_at) - new Date(a.begin_at)
                        })
                        .filter((match) => {
                            return new Date(match.begin_at) < new Date()
                        })
                )
            })
            break
    }
}

export function globalLeagues(req, res) {
    res.send('This is global leagues API section')
}