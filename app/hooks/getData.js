
'use client';

import { useEffect, useState } from 'react';

async function getData(token, api_url) {
    const res = await fetch(
        api_url,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export function generateData(token, api_url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getData(token, api_url);
                setData(res);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return { data, loading, error };
}
