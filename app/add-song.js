"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

function GetPlaylist(props) {
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState(null);
    const [playlistId, setPlaylistId] = useState(null);
    const { uri } = props;

    useEffect(() => {
        if (session) {
            async function fetchPlaylists() {
                const res = await fetch("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                } else {
                    setPlaylists(data);
                }
            }

            fetchPlaylists();
        }
    }, [status, session]);

    useEffect(() => {
        if (playlists) {
            const targetPlaylist = playlists.items.find(p => p.name === "Forgotify Songs");
            if (targetPlaylist) {
                setPlaylistId(targetPlaylist.id);
            }
        }
        // else {
        //     // create playlist
        // }
    }, [playlists]);

    const addSong = () => {
        console.log(playlistId, uri)
        if (!playlistId || !uri) return;

        async function addTrack() {
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

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            } else {
                console.log("Track added successfully!");
            }
        }

        addTrack();
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