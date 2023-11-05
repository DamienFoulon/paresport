// Libs
import dotenv from 'dotenv'

// Config
dotenv.config()

let pandascore = async function (url, debug) {
    if (debug) console.log('fetching data from ' + url)
    const dataRes = await fetch(url + `?token=${process.env.PANDASCORE_TOKEN}`);
    const dataJson = await dataRes.json()
    return dataJson
}

export default pandascore
