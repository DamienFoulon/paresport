// Libs
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Routers
import indexRouter from './routes/index.js'
import apiRouter from './routes/api.js'

// Config
const app = express()
const prisma = new PrismaClient()
const port = process.env.APP_PORT || 8100
const secretKey = process.env.JWT_SECRET
app.use(cors({
    origin: 'https://paresport.com',
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

// Cron
import { scheduledUpdateTeams } from './scheduled/updateTeams.js'
import { scheduledUpdateMatches } from './scheduled/updateMatches.js'
import { scheduledRemoveBlacklistTokens} from './scheduled/removeBlacklistTokens.js'

scheduledUpdateTeams()
scheduledUpdateMatches()
scheduledRemoveBlacklistTokens()

// Static files
app.use(express.static(path.join(path.resolve(), 'public')))

app.listen(port, () => {
    console.log(`Listening at the following address http://localhost:${port}`)
})

// Routes
app.use('/', indexRouter)
// API
app.use('/api', apiRouter)
