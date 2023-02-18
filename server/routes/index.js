// Libs
import express from 'express'

// Controllers
import {
    index,
    registerController,
    onfindoCheckController,
} from '../controllers/index.js'

// Middlewares

// Config
const router = express.Router()

// Routes
router.get('/', index)
router.post('/register', registerController)
router.post('/onfindoCheck', onfindoCheckController)
export default router
