const client_id = process.env.SPOTIFY_API_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAuth() {
  const token_url = 'https://accounts.spotify.com/api/token';

  const res = await fetch(
    token_url,
    {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
      })
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
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
    throw new Error('Failed to fetch data');
  }

  return res.json()
}

// async function getId() {
//   const response = await getAuth();
//   let trackList = [];
//   for (let h = 0; h < 1000; h += 50) {
//     const r = await getData(response.access_token, `https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=${h}`);
//     for (let i of r["albums"]["items"]) {
//       if (i["album_type"] === "single") {
//         let id = i["external_urls"]["spotify"].substring(31);
//         const q = await getData(response.access_token, `https://api.spotify.com/v1/albums/${id}/tracks`);
//         let source = q["items"][0]["external_urls"]["spotify"].substring(31);
//         trackList.push(source);
//       }
//     }
//   }

//   return trackList[Math.floor(Math.random() * trackList.length)];
// }

import ClientComponent from './client-component'

export default async function Home() {
  // const id = await getId();
  const response = await getAuth();
  const result = await getData(response.access_token, `https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0`);
  // const access_token = await getAuth().access_token;
  
  // const link = `https://open.spotify.com/embed/track/${id}?utm_source=oembed`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <iframe className="rounded-xl w-screen h-96" title="Spotify Embed: I&apos;ll Be Right There" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={link}></iframe> */}
        <ClientComponent result={result} token={response.access_token} />
    </main>
  )
}
