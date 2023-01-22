let pandascore = async function(url, token) {
    console.log("fetching data from " + url);
    const dataRes = await fetch(url);
    const dataJson = await dataRes.json();
    return dataJson;
}

export default pandascore;