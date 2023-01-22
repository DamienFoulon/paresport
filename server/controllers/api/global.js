// Utils
import pandascore from "../../utils/pandascore.js";

export function global(req, res) {
    res.send('This is global API section');
}

export function globalMatches(req, res) {
    let globalMatches = pandascore(
        `https://api.pandascore.co/matches?token=${process.env.PANDASCORE_TOKEN}`
    );
    res.send(globalMatches);
}

export function globalLeagues(req, res) {
    res.send('This is global leagues API section');
}