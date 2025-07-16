"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState } from 'react';

function GetPlaylist() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState(null);
    const [playlistId, setPlaylistId] = useState(null);
    const trackUri = "1sEWrhnrFmGI1QLaAmYJnn";

    useEffect(() => {
        if (status === 'authenticated') {
            async function fetchSpotifyProfile() {
                const res = await fetch('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                } else {
                    setProfile(data);
                }
            }

            fetchSpotifyProfile();
        }
    }, [status, session]);

    useEffect(() => {
        if (profile) {
            const targetPlaylist = profile.items.find(p => p.name === "Forgotify Songs");
            if (targetPlaylist) {
                setPlaylistId(targetPlaylist.id);
            }
        }
    }, [profile]);

    useEffect(() => {
        if (!playlistId || !trackUri) return;

        async function addTrack() {
            const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: [`spotify:track:${trackUri}`],
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            } else {
                console.log('Track added successfully!');
            }
        }

        addTrack();
    }, [playlistId]);


    if (status === 'loading') return <p>Loading...</p>;
    if (!session) return <p>Please sign in.</p>;

    return (
        <div>
            <h1>Spotify Profile</h1>
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