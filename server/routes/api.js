// Libs
import express from 'express';

// Controllers
import { global, globalMatches, globalLeagues } from '../controllers/api/global.js';
import {
    valorant,
    valorantMatches,
    valorantLeagues,
    valorantTeams,
    valorantRawMatches,
} from '../controllers/api/valorant.js'
import { lol, lolMatches, lolLeagues } from '../controllers/api/lol.js';
import { dota2, dota2Matches, dota2Leagues } from "../controllers/api/dota2.js";
import { csgo, csgoMatches, csgoLeagues } from "../controllers/api/csgo.js";
import { rl, rlMatches, rlLeagues } from "../controllers/api/rl.js";
import {
    authVerifyToken,
    authLogout,
    authLogin,
    authRegister ,
    authValidate,
    authDeleteAccount,
    authResetPassword,
    authGetCredentials
} from '../controllers/api/auth.js';

// Middlewares
import { isLogin } from '../middlewares/isLogin.js';

// Config
const router = express.Router();

// Routes
router.get('/', global);

// Global
router.get('/global', global);
router.get('/global/matches', globalMatches);
router.get('/global/leagues', globalLeagues);

// Valorant
router.get('/valorant', valorant);
router.get('/valorant/matches', valorantMatches);
router.get('/valorant/leagues', valorantLeagues);
router.get('/valorant/teams', valorantTeams);
router.get('/valorant/raw', valorantRawMatches);

// League of Legends
router.get('/lol', lol);
router.get('/lol/matches', lolMatches);
router.get('/lol/leagues', lolLeagues);

// Dota 2
router.get('/dota2', dota2);
router.get('/dota2/matches', dota2Matches);
router.get('/dota2/leagues', dota2Leagues);

// Counter Strike: Global Offensive
router.get('/csgo', csgo);
router.get('/csgo/matches', csgoMatches);
router.get('/csgo/leagues', csgoLeagues);

router.get('/rl', rl);
router.get('/rl/matches', rlMatches);
router.get('/rl/leagues', rlLeagues);

// Auth
router.post('/auth/register', authRegister);
router.get('/auth/validate', authValidate)
router.post('/auth/login', authLogin);
router.post('/auth/logout', authLogout);
router.post('/auth/resetPassword', isLogin, authResetPassword);
router.post('/auth/verifyToken', authVerifyToken);
router.post('/auth/deleteAccount', isLogin, authDeleteAccount);
router.post('/auth/getCredentials', isLogin, authGetCredentials);

export default router;