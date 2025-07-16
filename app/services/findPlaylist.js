export async function findPlaylist(token) {
    const playlistsRes = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const playlistsData = await playlistsRes.json();
    if (!playlistsRes.ok) throw new Error("Failed to fetch data");

    const targetPlaylist = playlistsData.items.find(p => p.name === "Forgotify Songs");
    if (targetPlaylist) {
        return targetPlaylist.id;
    }

    const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const userData = await userRes.json();
    if (!userRes.ok) throw new Error("Failed to fetch data");

    const createRes = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Forgotify Songs",
            public: false,
            description: "Created with Lostify (http://lostify.vercel.app)!",
        }),
    });
    const newPlaylist = await createRes.json();
    if (!createRes.ok) throw new Error("Failed to fetch data");
    return newPlaylist.id;
}