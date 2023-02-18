// Libs
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

// Routers
import indexRouter from './routes/index.js'
import apiRouter from './routes/api.js'

// Config
const app = express()
const prisma = new PrismaClient()
const port = process.env.APP_PORT || 8000
const secretKey = process.env.JWT_SECRET
app.use(bodyParser.json())

// Static files
app.use(express.static(path.join(path.resolve(), 'public')))

app.listen(port, () => {
    console.log(`Listening at the following address http://localhost:${port}`)
})

// Routes
app.use('/', indexRouter)
// API
app.use('/api', apiRouter)
