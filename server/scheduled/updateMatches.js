import cron from 'node-cron';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

// Config
const prisma = new PrismaClient();

export async function scheduledUpdateMatches() {
    let task = cron.schedule("*/30 * * * *", async function () {
        console.log('\x1b[33m Updating matches... \x1b[0m')
        let query = 'getSchedule?hl=fr-FR&sport=val'
        axios({
            method: 'get',
            url: `https://esports-api.service.valorantesports.com/persisted/val/${query}`,
            headers: {
                'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
            }
        }).then(async (response) => {
            let matches = await response.data.data.schedule.events
            const promises = matches.map(async (match) => {
                let matchId = match.match ? match.match.id : null
                if(matchId) {
                    let matchNewStatus = match.state
                    let winner = await prisma.teams.findMany({
                        where: { slug: match.match ? match.match.teams.filter((team) => team.result ? team.result.outcome === 'win' : 'TBD').length > 0 ? match.match.teams.filter((team) => team.result ? team.result.outcome === 'win' : 'TBD')[0].code : 'TBD' : undefined, game: 'valorant' }
                    }).then((team) => {
                        return team[0] ? team[0].id : 'TBD'
                    })
                    let createdMatch = await prisma.matches.findUnique({
                        where: { id: matchId }
                    }).then(async (fetchedMatch) => {
                        if(fetchedMatch) {
                            let matchOldStatus = fetchedMatch.status
                            console.log(`Updating bets status for match ${matchId}...`)
                            if(matchNewStatus === 'completed') {
                                let bets = await prisma.bets.findMany({
                                    where: { match: matchId, result: 'pending' }
                                }).then(async (fetchedBets) => {
                                    for(let bet of fetchedBets) {
                                        if(bet.team === winner) {
                                            await prisma.bets.update({
                                                where: { id: bet.id },
                                                data: {
                                                    result: 'won'
                                                }
                                            })
                                            await prisma.user.update({
                                                where: { id: bet.userId },
                                                data: {
                                                    coins: await prisma.user.findUnique({
                                                        where: { id: bet.userId }
                                                    }).then((user) => {
                                                        return user.coins + bet.amount * 2
                                                    })
                                                }
                                            })
                                        } else {
                                            await prisma.bets.update({
                                                where: { id: bet.id },
                                                data: {
                                                    result: 'lost'
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                            if(matchOldStatus !== matchNewStatus) {
                                console.log(`Updating match ${fetchedMatch.name}`)
                                await prisma.matches.update({
                                    where: { id: matchId },
                                    data: {
                                        status: matchNewStatus,
                                        team1Score: match.match ? match.match.teams ? match.match.teams[0].result.gameWins : 0 : 0,
                                        team2Score: match.match ? match.match.teams ? match.match.teams[1].result.gameWins : 0 : 0,
                                        winner: winner
                                    }
                                })
                            }
                        } else {
                            await prisma.matches.create({
                                data: {
                                    id: matchId ? matchId : 'TBD',
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
                                    team1Score: match.match ? match.match.teams ? match.match.teams[0].result.gameWins : 0 : 0,
                                    team2: await prisma.teams.findMany({
                                        where: match.match ? { slug: match.match.teams[1].code, game: 'valorant' } : { slug: 'TBD', game: 'valorant' }
                                    }).then((team) => {
                                        return team[0] ? team[0].id : 'TBD'
                                    }),
                                    team2Score: match.match ? match.match.teams ? match.match.teams[1].result.gameWins : 0 : 0,
                                    winner: winner,
                                }
                            })
                        }
                    })
                }
            })
            await Promise.all(promises)
            console.log('\x1b[32m Matches updated ! \x1b[0m')
        })
    });
}