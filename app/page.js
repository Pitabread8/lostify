// TO-DO
// prevent refreshing page upon sign-in/out - redirect: false in signIn()
// convert <img /> to <Image />
// convert <a> to <Link>
// explanation modal

export const dynamic = "force-dynamic";

const client_id = process.env.AUTH_SPOTIFY_ID;
const client_secret = process.env.AUTH_SPOTIFY_SECRET;
import SignIn from "./components/sign-in"
import SongEmbed from "./components/song-embed"

let cachedToken = null;
let tokenExpiresAt = 0;

async function getPublicToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

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

export default async function Home() {
  const response = await getPublicToken();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-12 text-center sm:w-72 md:w-full">
        <h1 className="text-5xl font-bold text-[#1DB954] my-4">Lostify</h1>
        <p className="text-sm md:text-lg">Discover "forgotten" songs from the depths of Spotify's library!</p>
      </div>
      <SignIn />
      <SongEmbed token={response} />
      <a className="mt-12 underline hover:text-blue-500 underline-offset-2">How does it work?</a>
    </main>
  )
}
