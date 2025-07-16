"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";

function GetPlaylist(props) {
    const { data: session } = useSession();
    const [playlistId, setPlaylistId] = useState(null);
    const isCreatingRef = useRef(false);
    const { uri } = props;

    useEffect(() => {
        if (!session?.accessToken || isCreatingRef.current) return;

        async function fetchOrCreatePlaylist() {
            isCreatingRef.current = true;

            const playlistsRes = await fetch("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            const playlistsData = await playlistsRes.json();
            if (!playlistsRes.ok) throw new Error("Failed to fetch data");

            const targetPlaylist = playlistsData.items.find(p => p.name === "Forgotify Songs");
            if (targetPlaylist) {
                setPlaylistId(targetPlaylist.id);
                return;
            }

            const userRes = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            const userData = await userRes.json();
            if (!userRes.ok) throw new Error("Failed to fetch data");

            const createRes = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Forgotify Songs",
                    public: false,
                    description: "Created using Lostify (http://lostify.vercel.app)!",
                }),
            });
            const newPlaylist = await createRes.json();
            if (!createRes.ok) throw new Error("Failed to fetch data");
            setPlaylistId(newPlaylist.id);
        }

        fetchOrCreatePlaylist();
    }, [session]);

    async function addSong() {
        if (!playlistId || !uri) return;

        const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: [uri],
            }),
        });

        if (!res.ok) throw new Error("Failed to fetch data");
    }

    // if (status === "loading") return <p>Loading...</p>;
    // if (!session) return <p>Please sign in.</p>;

    return (
        <div>
            <button onClick={() => addSong()} className="text-center p-4 bg-[#1DB954] rounded-lg text-xl">Save Song</button>
        </div>
    );
}

export default function AddSong(props) {
    const { uri } = props;

    return (
        <SessionProvider>
            {/* {status === "loading" && <p>Loading tracks...</p>} */}
            <GetPlaylist uri={uri} />
        </SessionProvider>
    );
}