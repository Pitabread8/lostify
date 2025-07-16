// TO-DO
// when auth expires, re-authify
// prevent refreshing page upon sign-in/out
// convert <img /> to <Image />

const client_id = process.env.AUTH_SPOTIFY_ID;
const client_secret = process.env.AUTH_SPOTIFY_SECRET;
import SignIn from "./components/sign-in"
import SongEmbed from "./components/song-embed"

async function getAuth() {
  const token_url = "https://accounts.spotify.com/api/token";

  const res = await fetch(
    token_url,
    {
      method: "POST",
      body: new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret
      })
    }
  );

  if (!res.ok) throw new Error("Failed to fetch auth token data");

  return res.json()
}

export default async function Home() {
  const response = await getAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SignIn token={response.access_token} />
      <SongEmbed token={response.access_token} />
    </main>
  )
}
