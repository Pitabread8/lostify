"use client";

import { useState, useCallback } from "react";

export function useAddSong() {
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addSong = useCallback(async (playlistId, uri, token) => {
        if (!playlistId || !uri || !token) return;

        setSuccess(null);
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uris: [uri] }),
            });

            if (!res.ok) throw new Error("Failed to add song");
            else setSuccess(uri);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { addSong, loading, error, success };
}
