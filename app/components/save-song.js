"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useFindPlaylist } from "../hooks/useFindPlaylist";
import { useAddSong } from "../hooks/useAddSong";

function SaveButton(props) {
    const { uri } = props;
    const { data: session, status } = useSession();

    const token = session?.accessToken ?? null;
    const { playlistId, loading: playlistLoading, error: playlistError } = useFindPlaylist(token);
    const { addSong, loading: songLoading, error: songError, success } = useAddSong();
    const isSaved = success === uri;

    const handleClick = () => {
        addSong(playlistId, uri, token);
    };

    return (
        <>
            {session && !isSaved && <button onClick={() => handleClick()} className="text-center p-3 md:p-4 bg-[#1DB954] rounded-lg text-lg md:text-xl">Save Song</button>}
            {isSaved && <div className="text-center p-3 md:p-4 text-[#1DB954] rounded-lg text-lg md:text-xl">Song Saved ✔</div>}
        </>
    );
}

export default function SaveSong(props) {
    const { uri } = props;

    return (
        <SessionProvider basePath="/api/auth" key="session">
            <SaveButton uri={uri} />
        </SessionProvider>
    );
}