import cron from 'node-cron';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

// Config
const prisma = new PrismaClient();

export async function scheduledUpdateTeams() {
    let task = cron.schedule("*/25 * * * *", async function () {
        console.log('\x1b[33m Updating teams... \x1b[0m')
        let query = 'getSchedule?hl=fr-FR&sport=val'
        axios({
            method: 'get',
            url: `https://esports-api.service.valorantesports.com/persisted/val/${query}`,
            headers: {
                'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
            }
        }).then(async (response) => {
            let teams = []
            let matches = await response.data.data.schedule.events
            matches.map((match) => {
                match.match ? match.match.teams.map((team) => {
                    !teams.includes(team) ? teams.push(team) : console.log('no match')
                }) : console.log('\x1b[31m No team found \x1b[0m')
            })
            const promises = teams.map(async (team) => {
                let createdTeam = await prisma.teams.findMany({
                    where: { slug: team.code, game: 'valorant' }
                }).then(async (fetchedTeam) => {
                    if(fetchedTeam.length > 1) {
                        console.log(`Team ${fetchedTeam[0].name} has been found ${fetchedTeam.length} times`)
                        while(fetchedTeam.length > 1) {
                            console.log(`Deleting team ${fetchedTeam[0].name}`)
                            await prisma.teams.delete({
                                where: { id: fetchedTeam[0].id }
                            })
                        }
                    } else if (fetchedTeam.length < 1) {
                        console.log(`Creating team ${team.name}`)
                        await prisma.teams.create({
                            data: {
                                id: `${Math.floor(Math.random() * 900000000000000000) + 100000000000000000}`,
                                name: team.name,
                                game: 'valorant',
                                slug: team.code,
                                logo: team.image,
                                seasonRecords: `${team.record.wins}w-${team.record.losses}l`,
                                records: null,
                            }
                        })
                    } else {
                        console.log(`Updating team ${fetchedTeam[0].name}`)
                        await prisma.teams.update({
                            where: { id: fetchedTeam[0].id },
                            data: {
                                name: team.name,
                                game: 'valorant',
                                slug: team.code,
                                logo: team.image,
                                seasonRecords: team.record ? `${team.record.wins}w-${team.record.losses}l` : null,
                                records: null,
                            }
                        })
                    }
                })
            })
            await Promise.all(promises);
            console.log('\x1b[32m Teams updated. \x1b[0m')
        })
    });
    return task;
}