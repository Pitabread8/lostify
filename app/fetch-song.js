"use client"

import { useState } from 'react'

export default function FetchSong(props) {
    const { result, token } = props;
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((res) => res.json())

    const [num, setNum] = useState(0)

    return (
        <div>
            <button onClick={() => setNum(Math.floor(Math.random() * result["albums"]["items"].length))}>New song</button>
            <iframe className="rounded-xl w-screen h-96" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={`https://open.spotify.com/embed/album/${result["albums"]["items"][num]["external_urls"]["spotify"].substring(31)}`}></iframe>
        </div>
    )
}