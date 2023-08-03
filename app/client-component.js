'use client'

import useSWRInfinite from 'swr/infinite'
import useSWR, { preload } from 'swr'
import { useState } from 'react'

// preload(`https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0`, fetcher)
export default function Profile(props) {
    const { result, token } = props;
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((res) => res.json())
    // const { data: album, isloading, size, setSize } = useSWRInfinite((index) => `https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=${index * 50}`, fetcher, { parallel: true })
    // setSize(20)
    // const [link, setLink] = useState("https://open.spotify.com/embed/track/7EQvdUJqZ2i7SWvSB2VqGA?si=e9aeb60b547f4194")

    // const pages = Math.floor(Math.random() * 20);
    // const albums = Math.floor(Math.random() * 50);
    // const { data: track } = useSWR(() => { if (data) {`https://api.spotify.com/v1/albums/${data[pages]["albums"]["items"][albums]["external_urls"]["spotify"].substring(31)}/tracks`}}, fetcher)
    // const { data: track } = useSWR(() => {
    //     if (album && album[pages]["albums"]["items"].length > 0) {
    //       return `https://api.spotify.com/v1/albums/${album[pages]["albums"]["items"][albums]["external_urls"]["spotify"].substring(31)}/tracks`;
    //     }
    //     return null;
    //   }, fetcher)

    // const { data: album } = useSWR(`https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=50&offset=0`, fetcher)
    const [num, setNum] = useState(0)

    // const { data: track } = useSWR(() => {
    //     return `https://api.spotify.com/v1/albums/${result["albums"]["items"][num]["external_urls"]["spotify"].substring(31)}/tracks`;
    // }, fetcher)
    // console.log(track)

    return (
        <div>
            <button onClick={() => setNum(Math.floor(Math.random() * result["albums"]["items"].length))}>New song</button>
            <iframe className="rounded-xl w-screen h-96" title="Spotify Embed" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src={`https://open.spotify.com/embed/album/${result["albums"]["items"][num]["external_urls"]["spotify"].substring(31)}`}></iframe>
        </div>
    )
}