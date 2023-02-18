let pandascore = async function (url, debug) {
    if (debug) console.log('fetching data from ' + url)
    const dataRes = await fetch(url)
    const dataJson = await dataRes.json()
    return dataJson
}

export default pandascore
