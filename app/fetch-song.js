"use client"

import { generateData } from './hooks/getData';
import { useState } from 'react';

export default function FetchSong(props) {
    const { token } = props;
    const [num, setNum] = useState(0);

    const { data: albumData, loading: albumLoading, error: albumError } = generateData(token, "https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0");

    const albumId = albumData?.albums?.items?.[num]?.id;

    const { data: trackData, loading: trackLoading, error: trackError } = generateData(token, `https://api.spotify.com/v1/albums/${albumId}/tracks`);

    return (
        <>
            {/* {albumLoading && <p>Loading albums...</p>} */}
            {/* {trackLoading && <p>Loading tracks...</p>} */}

            {trackData && <iframe className="rounded-xl w-[50vw] h-72" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={`https://open.spotify.com/embed/track/${trackData["items"][0]["external_urls"]["spotify"].substring(31)}`}></iframe>}
            <button onClick={() => setNum(Math.floor(Math.random() * albumData["albums"]["items"].length))} className="text-center p-4 bg-[#1DB954] rounded-lg text-xl">Next Song</button>
        </>
    )
}
