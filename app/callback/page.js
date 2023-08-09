const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const getData = async code => {
  if (!code) return null

  try {
    const tokens = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'http://localhost:3000/callback'
      })
    });

    if (!tokens.ok) return null
    const tokenData = await tokens.json()
    const access_token = tokenData['access_token']

    const info = await fetch('https://api.spotify.com/v1/me/', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!info.ok) return null
    const infoData = await info.json()
    return infoData
  }

  catch (reason) {
    return null
  }
}

export default async function Foo({ searchParams }) {
  const codeSearch = searchParams?.code ?? ""
  const code = Array.isArray(codeSearch)
    ? codeSearch[0]
    : codeSearch

  const result = await getData(code)

  return (
    <>
      <h1>{result.display_name}</h1>
      <img src={result.images[0].url}></img>
    </>
  )
}
