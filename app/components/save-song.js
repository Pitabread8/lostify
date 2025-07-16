"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import { getOrCreatePlaylist } from "../hooks/getOrCreatePlaylist";
import { addSong } from "../hooks/addSong";

function SaveButton(props) {
    const { data: session } = useSession();
    const [playlistId, setPlaylistId] = useState(null);
    const isCreated = useRef(false);
    const { uri } = props;

    useEffect(() => {
        if (!session?.accessToken || isCreated.current) return;
        isCreated.current = true;

        getOrCreatePlaylist(session.accessToken).then((result) => {
            setPlaylistId(result);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }, [session]);

    return (
        <div>
            {session && <button onClick={() => addSong(playlistId, uri, session.accessToken)} className="text-center p-4 bg-[#1DB954] rounded-lg text-xl">Save Song</button>}
        </div>
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