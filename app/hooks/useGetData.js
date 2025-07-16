"use client";

import { useEffect, useState } from "react";

async function generateData(token, api_url) {
    const res = await fetch(
        api_url,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
}

export function useGetData(token, api_url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token || !api_url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await generateData(token, api_url);
                setData(res);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [api_url]);

    return { data, loading, error };
}
