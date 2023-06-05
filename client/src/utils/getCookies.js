export function getCookies() {
    const cookies = {};
    const cookieArr = document.cookie.split(';');

    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        const cookieName = cookiePair[0].trim();
        const cookieValue = decodeURIComponent(cookiePair[1]);
        cookies[cookieName] = cookieValue;
    }

    return cookies;
}
