export async function addSong(playlistId, uri, token) {
    if (!playlistId || !uri) return;

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uris: [uri],
        }),
    });

    if (!res.ok) throw new Error("Failed to fetch data");
}