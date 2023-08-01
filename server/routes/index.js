// Libs
import express from 'express'

// Controllers
import {
    index,
    onfindoCheckController,
    redeemCoinsController,
    placeBetController,
} from '../controllers/index.js'

// Middlewares
import {
    isLogin,
} from '../middlewares/isLogin.js'

// Config
const router = express.Router()

// Routes
router.get('/', index)
router.post('/redeemCoins', isLogin, redeemCoinsController)
router.post('/onfindoCheck', onfindoCheckController)
router.post('/placeBet', isLogin, placeBetController)
router.post('/postDebug', (req, res) => {
    console.log(req.body)
    res.send('OK')
})
export default router