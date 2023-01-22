// Libs
import express from 'express';

// Controllers
import { global, globalMatches, globalLeagues } from '../controllers/api/global.js';
import { valorant, valorantMatches, valorantLeagues } from '../controllers/api/valorant.js';
import { lol, lolMatches, lolLeagues } from '../controllers/api/lol.js';
import { dota2, dota2Matches, dota2Leagues } from "../controllers/api/dota2.js";
import { csgo, csgoMatches, csgoLeagues } from "../controllers/api/csgo.js";

// Middlewares

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


export default router;