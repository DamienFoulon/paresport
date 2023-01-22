// Libs
import dotenv from 'dotenv';

// Utils
import pandascore from "../../utils/pandascore.js";

// Config
dotenv.config();

export function valorant(req, res) {
    res.send('This is Valorant API section');
}

export function valorantMatches(req, res) {
    let valorantMatches = pandascore(
        `https://api.pandascore.co/valorant/matches?token=${process.env.PANDASCORE_TOKEN}`
    );

    valorantMatches.then((data) => {
        res.json(data);
    })
}

export function valorantLeagues(req, res) {
    let valorantLeagues = pandascore(
        `https://api.pandascore.co/valorant/leagues?token=${process.env.PANDASCORE_TOKEN}`
    )
   valorantLeagues.then((data) => {
         res.json(data);
   })
}