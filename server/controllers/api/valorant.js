// Libs
import dotenv from 'dotenv'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'

// Config
dotenv.config()
const prisma = new PrismaClient()

export function valorant(req, res) {
    res.send('This is Valorant API section')
}


export async function valorantMatches(req, res) {
    let sort = req.query.sort
    let league = req.query.league
    let team = req.query.team

    let query = 'getSchedule?hl=fr-FR&sport=val'
    switch (sort) {
        default:
            break
        case 'upcoming':
            query += '&eventState=unstarted'
            break
        case 'live':
            query += `&eventState=inProgress`
            break
        case 'completed':
            query += `&eventState=completed`
            break
    }
    if(league !== undefined) {
        let leagueId = axios({
            method: 'get',
            url: 'http://localhost:8000/api/valorant/leagues',
            headers: {
                'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
            }
        }).then((async (response) => {
            let leagues = await response.data.data.leagues
            let league = leagues.find(league => league.slug === req.query.league)
            return league.id
        }))
        query += `&leagueId=${await leagueId}`
    }
    axios({
        method: 'get',
        url: `https://esports-api.service.valorantesports.com/persisted/val/${query}`,
        headers: {
            'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
        }
    }).then(async (response) => {
        if(team !== undefined) {
            let matches = await response.data.data.schedule.events
            res.json(
                matches.filter((match) => {
                    return match.match.teams[0].code === team || match.match.teams[1].code === team
                })
            )
        } else {
            let matches = await response.data.data.schedule.events
            await matches.map(async (match) => {
                const winner = await prisma.teams.findMany({
                    where: { slug: match.match ? match.match.teams.filter((team) => team.result && team.result.outcome === 'win').length > 0 ? match.match.teams.filter((team) => team.result && team.result.outcome === 'win')[0].code : 'TBD' : undefined, game: 'valorant' }
                }).then((team) => {
                    return team[0] ? team[0].id : 'TBD'
                })
                await prisma.matches.upsert({
                    where: { id: match.match ? match.match.id : 'TBD' },
                    update: {
                        id: match.match ? match.match.id : 'TBD',
                        name: match.match ? `${match.league.name} - ${match.tournament.season.name} ${match.blockName} | ${match.match.teams[0].code} vs ${match.match.teams[1].code}` : 'TBD',
                        startTime: new Date(match.startTime),
                        game: 'valorant',
                        status: match.state,
                        leagueId: await prisma.leagues.findMany({
                            where: { slug: match.league.slug, game: 'valorant' }
                        }).then((league) => {
                            return league[0].id
                        }),
                        tournamentName: match.tournament ? match.tournament.split.name : 'TBD',
                        tournamentSeason: match.tournament ? match.tournament.season.name : 'TBD',
                        strategy: match.match? match.match.strategy ? `${match.match.strategy.type}${match.match.strategy.count}` : 'TBD' : 'TBD',
                        team1: await prisma.teams.findMany({
                            where: match.match ? { slug: match.match.teams[0].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                        }).then((team) => {
                            return team[0] ? team[0].id : 'TBD'
                        }),
                        team1Score: match.match ? match.match.teams ? match.match.teams[0].result ? match.match.teams[0].result.gameWins : 0 : 0 : 0,
                        team2: await prisma.teams.findMany({
                            where: match.match ? { slug: match.match.teams[1].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                        }).then((team) => {
                            return team[0] ? team[0].id : 'TBD'
                        }),
                        team2Score: match.match ? match.match.teams ? match.match.teams[1].result ? match.match.teams[1].result.gameWins : 0 : 0 : 0,
                        winner: winner,
                    },
                    create: {
                        id: match.match ? match.match.id : 'TBD',
                        name: match.match ? `${match.league.name} - ${match.tournament.season.name} ${match.blockName} | ${match.match.teams[0].code} vs ${match.match.teams[1].code}` : 'TBD',
                        startTime: new Date(match.startTime),
                        game: 'valorant',
                        status: match.state,
                        leagueId: await prisma.leagues.findMany({
                            where: { slug: match.league.slug, game: 'valorant' }
                        }).then((league) => {
                            return league[0].id
                        }),
                        tournamentName: match.tournament ? match.tournament.split.name : 'TBD',
                        tournamentSeason: match.tournament ? match.tournament.season.name : 'TBD',
                        strategy: match.match? match.match.strategy ? `${match.match.strategy.type}${match.match.strategy.count}` : 'TBD' : 'TBD',
                        team1: await prisma.teams.findMany({
                            where: match.match ? { slug: match.match.teams[0].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                        }).then((team) => {
                            return team[0] ? team[0].id : 'TBD'
                        }),
                        team1Score: match.match ? match.match.teams ? match.match.teams[0].result ? match.match.teams[0].result.gameWins : 0 : 0 : 0,
                        team2: await prisma.teams.findMany({
                            where: match.match ? { slug: match.match.teams[1].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                        }).then((team) => {
                            return team[0] ? team[0].id : 'TBD'
                        }),
                        team2Score: match.match ? match.match.teams ? match.match.teams[1].result ? match.match.teams[1].result.gameWins : 0 : 0 : 0,
                        winner: winner,
                    }
                })
            })
            const matchData = await Promise.all(matches.map(async (match) => {
                try {
                    const team1 = await prisma.teams.findMany({
                        where: match.match ? { slug: match.match.teams[0].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                    }).then((team) => {
                        return {
                            id: team[0] ? team[0].id : 'TBD',
                            name: team[0] ? team[0].name : 'TBD',
                            slug: team[0] ? team[0].slug : 'TBD',
                        };
                    });

                    const team2 = await prisma.teams.findMany({
                        where: match.match ? { slug: match.match.teams[1].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                    }).then((team) => {
                        return {
                            id: team[0] ? team[0].id : 'TBD',
                            name: team[0] ? team[0].name : 'TBD',
                            slug: team[0] ? team[0].slug : 'TBD',
                        };
                    });

                    const league = await prisma.leagues.findMany({
                        where: { slug: match.league.slug, game: 'valorant' }
                    }).then((league) => {
                        return {
                            id: league[0] ? league[0].id : 'TBD',
                            name: league[0] ? league[0].name : 'TBD',
                            slug: league[0] ? league[0].slug : 'TBD',
                            region: league[0] ? league[0].region : 'TBD',
                        }
                    });

                    const winner = await prisma.teams.findMany({
                        where: { slug: match.match ? match.match.teams.filter((team) => team.result && team.result.outcome === 'win').length > 0 ? match.match.teams.filter((team) => team.result && team.result.outcome === 'win')[0].code : 'TBD' : undefined, game: 'valorant' }
                    }).then((team) => {
                        return team[0] ? team[0].name : 'TBD';
                    });

                    return {
                        id: match.match ? match.match.id : 'TBD',
                        name: match.match ? `${match.league.name} - ${match.tournament.season.name} ${match.blockName} | ${match.match.teams[0].code} vs ${match.match.teams[1].code}` : 'TBD',
                        startTime: new Date(match.startTime),
                        game: 'valorant',
                        status: match.state,
                        league: {
                            id: league.id,
                            name: league.name,
                            slug: league.slug,
                            region: league.region,
                            image: match.league ? match.league.image ? match.league.image : 'TBD' : 'TBD',
                        },
                        tournamentName: match.tournament ? match.tournament.split.name : 'TBD',
                        tournamentSeason: match.tournament ? match.tournament.season.name : 'TBD',
                        strategy: match.match ? match.match.strategy ? `${match.match.strategy.type}${match.match.strategy.count}` : 'TBD' : 'TBD',
                        team1: {
                            id: team1.id,
                            name: team1.name,
                            slug: team1.slug,
                            image: match.match ? match.match.teams[0] ? match.match.teams[0].image : 'TBD' : 'TBD',
                        },
                        team1Score: match.match ? match.match.teams ? match.match.teams[0].result ? match.match.teams[0].result.gameWins : 0 : 0 : 0,
                        team2: {
                            id: team2.id,
                            name: team2.name,
                            slug: team2.slug,
                            image: match.match ? match.match.teams[1] ? match.match.teams[1].image : 'TBD' : 'TBD',
                        },
                        team2Score: match.match ? match.match.teams ? match.match.teams[1].result ? match.match.teams[1].result.gameWins : 0 : 0 : 0,
                        winner: winner
                    };
                } catch (error) {
                    console.log(`Error processing match ${match.match.id}: ${error}`);
                    return null; // or handle the error in some other way
                }
            }));

            res.json(matchData.filter(Boolean));
        }
    })
}

export async function valorantLeagues(req, res) {
    let sort = req.query.sort
    let query
    switch (sort) {
        default:
            query = `getLeagues?hl=fr-FR&sport=val`
            break
    }
    axios({
        method: 'get',
        url: `https://esports-api.service.valorantesports.com/persisted/val/${query}`,
        headers: {
            'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
        }
    }).then(async (response) => {
        let leagues = await response.data.data.leagues
        leagues.map(async (league) => {
            const createdLeague = await prisma.leagues.upsert({
                where: { id: league.id },
                update: {
                    id: league.id,
                    name: league.name,
                    game: 'valorant',
                    slug: league.slug,
                    logo: league.logo,
                    banner: null,
                    region: league.region,
                },
                create: {
                    id: league.id,
                    name: league.name,
                    game: 'valorant',
                    slug: league.slug,
                    logo: league.logo,
                    banner: null,
                    region: league.region,
                }
            })
        })
        res.json(await response.data)
    })
}

export async function valorantTeams(req, res) {
    let sort = req.query.sort
    let teams = await prisma.teams.findMany({
        where: { game: 'valorant' }
    })
    sort ? res.json(await teams.filter((team) => team.slug.toLowerCase() === sort.toLowerCase())) : res.json(await teams)
}