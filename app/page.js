// TO-DO
// prevent refreshing page upon sign-in/out `redirect: false` in signIn()
// convert <img /> to <Image />

const client_id = process.env.AUTH_SPOTIFY_ID;
const client_secret = process.env.AUTH_SPOTIFY_SECRET;
import { getAppToken } from "./lib/app-token";
import SignIn from "./components/sign-in"
import SongEmbed from "./components/song-embed"

async function getPublicToken() {
  const accessToken = await getAppToken({
    clientId: client_id,
    clientSecret: client_secret,
  });

  return accessToken;
}

export default async function Home() {
  const response = await getPublicToken();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SignIn />
      <SongEmbed token={response} />
    </main>
  )
}
