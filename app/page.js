const client_id = process.env.AUTH_SPOTIFY_ID;
const client_secret = process.env.AUTH_SPOTIFY_SECRET;
import SignIn from "./sign-in"

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

import FetchSong from './fetch-song'

export default async function Home() {
  const response = await getAuth();
  const result = await getData(response.access_token, `https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SignIn />
      </div>
      <FetchSong result={result} token={response.access_token} />
    </main>
  )
}
