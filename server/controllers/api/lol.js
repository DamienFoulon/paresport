// Libs
import dotenv from 'dotenv'
import axios from 'axios'

// Config
dotenv.config()

export function lol(req, res) {
    res.send('This is LoL API section')
}

export function lolMatches(req, res) {
    let sort = req.query.sort
    let query
    switch (sort) {
        default:
            query = `getSchedule?hl=fr-FR&sport=lol`
            break
        case 'upcoming':
            query = `getSchedule?hl=fr-FR&sport=lol&eventState=unstarted`
            break
        case 'live':
            query = `getSchedule?hl=fr-FR&sport=lol&eventState=inProgress`
            break
        case 'completed':
            query = `getSchedule?hl=fr-FR&sport=lol&eventState=completed`
            break
    }
    axios({
        method: 'get',
        url: `https://esports-api.service.valorantesports.com/persisted/val/${query}`,
        headers: {
            'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
        }
    }).then(async (response) => {
        res.json(await response.data.data.schedule.events)
    })
}

export function lolLeagues(req, res) {
    let sort = req.query.sort
    let query
    switch (sort) {
        default:
            query = `getLeagues?hl=fr-FR&sport=lol`
            break
    }
    axios({
        method: 'get',
        url: `https://esports-api.service.valorantesports.com/persisted/val/${query}`,
        headers: {
            'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
        }
    }).then(async (response) => {
        res.json(await response.data)
    })
}