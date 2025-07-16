"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import { useFindPlaylist } from "../hooks/useFindPlaylist";
import { useAddSong } from "../hooks/useAddSong";

function SaveButton(props) {
    const { data: session } = useSession();
    const [playlistId, setPlaylistId] = useState(null);
    const isCreated = useRef(false);
    const { uri } = props;

    useEffect(() => {
        if (!session?.accessToken || isCreated.current) return;
        isCreated.current = true;

        useFindPlaylist(session.accessToken).then((result) => {
            setPlaylistId(result);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }, [session]);

    return (
        <>
            {session && <button onClick={() => useAddSong(playlistId, uri, session.accessToken)} className="text-center p-3 md:p-4 bg-[#1DB954] rounded-lg text-lg md:text-xl">Save Song</button>}
        </>
    );
}

export default function SaveSong(props) {
    const { uri } = props;

    return (
        <SessionProvider>
            <SaveButton uri={uri} />
        </SessionProvider>
    );
}