let cachedToken = null;
let tokenExpiresAt = 0;

export async function getAppToken({ clientId, clientSecret }) {
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return cachedToken;
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
        }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch token");

    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000;

    return cachedToken;
}
