"use client"

import { useState } from 'react'
import { generateData } from './hooks/getData';

export default function FetchSong(props) {
    const { token } = props;
    const [num, setNum] = useState(0);

    const { data, loading, error } = generateData(token, "https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0");
    if (loading) return <p>Loading music...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div>
                <iframe className="rounded-xl w-96 h-48" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={`https://open.spotify.com/embed/album/${data["albums"]["items"][num]["external_urls"]["spotify"].substring(31)}`}></iframe>
                <button onClick={() => setNum(Math.floor(Math.random() * data["albums"]["items"].length))} className="text-center p-4 bg-[#1DB954] rounded-lg text-xl">Next Song</button>
            </div>
        </>
    )
}