"use client"

import { useGetData } from "../hooks/useGetData";
import { useState } from "react";
import SaveSong from "./save-song"

export default function SongEmbed(props) {
    const { token } = props;
    const [num, setNum] = useState(0);

    const { data: albumData, loading: albumLoading, error: albumError } = useGetData(token, "https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0");

    const albumId = albumData?.albums?.items?.[num]?.id;

    const { data: songData, loading: songLoading, error: songError } = useGetData(token, `https://api.spotify.com/v1/albums/${albumId}/tracks`);

    return (
        <>
            {
                songData &&
                <div className="flex flex-col items-center gap-2 md:gap-0 justify-center">
                    <iframe className="rounded-xl h-24 md:w-[50vw] md:h-72" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={`https://open.spotify.com/embed/track/${songData["items"][0]["external_urls"]["spotify"].substring(31)}`}></iframe>
                    <div className="flex flex-row gap-8">
                        <button onClick={() => setNum(Math.floor(Math.random() * albumData["albums"]["items"].length))} className="text-center p-3 md:p-4 bg-[#1DB954] rounded-lg text-lg md:text-xl">Next Song</button>
                        <SaveSong uri={songData["items"][0]["uri"]} />
                    </div>
                </div>
            }
        </>
    )
}
