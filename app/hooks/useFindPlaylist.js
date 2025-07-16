"use client";

import { useEffect, useState, useRef } from "react";

export function useFindPlaylist(token) {
    const [playlistId, setPlaylistId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isCreating = useRef(false);

    useEffect(() => {
        if (!token || isCreating.current) return;

        const findOrCreatePlaylist = async () => {
            isCreating.current = true;
            setLoading(true);
            setError(null);

            try {
                const playlistsRes = await fetch("https://api.spotify.com/v1/me/playlists", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const playlistsData = await playlistsRes.json();
                if (!playlistsRes.ok) throw new Error("Failed to fetch playlists data");

                const targetPlaylist = playlistsData.items.find(p => p.name === "Forgotify Songs");
                if (targetPlaylist) {
                    setPlaylistId(targetPlaylist.id);
                    return;
                }

                const userRes = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = await userRes.json();
                if (!userRes.ok) throw new Error("Failed to fetch user data");

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
                if (!createRes.ok) throw new Error("Failed to create playlist");
                setPlaylistId(newPlaylist.id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        findOrCreatePlaylist();
    }, [token]);

    return { playlistId, loading, error };
}