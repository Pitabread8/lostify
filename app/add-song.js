"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState } from 'react';

function GetPlaylist() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (status === 'authenticated') {
            async function fetchSpotifyProfile() {
                const res = await fetch('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                const data = await res.json();
                setProfile(data);
            }

            fetchSpotifyProfile();
        }
    }, [status, session]);

    if (status === 'loading') return <p>Loading...</p>;
    if (!session) return <p>Please sign in.</p>;

    return (
        <div>
            <h1>Spotify Profile</h1>
            <p>{JSON.stringify(profile, null, 2)}</p>
        </div>
    );
}

export default function Babble() {
    return (
        <SessionProvider>
            <GetPlaylist />
        </SessionProvider>
    );
}