const qs = require('qs');

const client_id = process.env.SPOTIFY_API_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

async function getAuth() {
  const token_url = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ 'grant_type': 'client_credentials' });

  const res = await fetch(
    token_url,
    {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getData(access_token, api_url) {
  const res = await fetch(
    api_url,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getId() {
  const response = await getAuth()
  const r = await getData(response.access_token, "https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=1&offset=0")
  let source;
  for (let i of r["albums"]["items"]) {
    if (i["album_type"] === "single") {
      let id = i["external_urls"]["spotify"].substring(31);
      const q = await getData(response.access_token, `https://api.spotify.com/v1/albums/${id}/tracks`)
      source = q["items"][0]["external_urls"]["spotify"].substring(31);
    }
  }

  return source
}

export default async function Home() {
  const id = await getId()
 
  let link = `https://open.spotify.com/embed/track/${id}?utm_source=oembed`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe className="rounded-xl w-screen h-96" title="Spotify Embed: I&apos;ll Be Right There" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={link}></iframe>
    </main>
  )
}
