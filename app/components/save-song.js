"use client"

import { signOut, useSession } from "next-auth/react"
import { useFindPlaylist } from "../hooks/useFindPlaylist";
import { useAddSong } from "../hooks/useAddSong";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RxOpenInNewWindow } from "react-icons/rx";

function SaveButton(props) {
    const { uri } = props;
    const { data: session } = useSession();

    const token = session?.accessToken ?? null;
    const { playlistId, loading: playlistLoading, error: playlistError } = useFindPlaylist(token);
    const { addSong, loading: songLoading, error: songError, success } = useAddSong();
    const isSaved = success === uri;

    if (playlistError || songError) signOut();

    const handleClick = () => {
        addSong(playlistId, uri, token);
    };

    return (
        <>
            {session && !isSaved && <button onClick={() => handleClick()} className="text-center p-3 md:p-4 bg-[#1DB954] rounded-lg text-lg md:text-xl">Save Song</button>}
            {isSaved && <div className="text-center p-3 md:p-4 text-[#1DB954] rounded-lg text-lg md:text-xl flex flex-row gap-2 items-center justify-center">
                <p>Song Saved</p>
                <IoIosCheckmarkCircleOutline />
            </div>}
            {playlistId && <a className="text-center hidden p-1 text-[#1DB954] underline underline-offset-4 rounded-lg text-xl md:flex flex-row gap-2 items-center justify-center" href={`https://open.spotify.com/playlist/${playlistId}`} target="_blank">
                <p>Lostify Playlist</p>
                <RxOpenInNewWindow />
            </a>}
        </>
    );
}

export default function SaveSong(props) {
    const { uri } = props;

    return (
        <SaveButton uri={uri} />
    );
}