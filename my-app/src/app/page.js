"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import RequestUserAccess from './components/RequestUserAccess';
import RequestAccessToken from "./components/RequestAccessToken";

export default function Home() {
  const secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;
  const apiPrefix = "https://api.spotify.com/v1/"
  let token = localStorage.getItem('access_token')
  
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    RequestAccessToken(updateKey)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = fetch('/api/spotify');
        const result = await response.json();
        setData(result);
      } catch(error) {
        setError(error.message)
      }
    }

    if(apiKey) {
      fetchData()
    }
  },[apiKey])

  const updateKey = (key) => {
    setApiKey(key);
  }

  const updateData = (data) => {
    setData(data);
  }
  
  return (
    <div>
      <h1>Spitify Fetched Data:</h1>
      <button onClick={RequestUserAccess}>Request User Access</button>
      <p>Api Key: {apiKey}</p>
      <p>Token: {token}</p>
    </div>
  )
}

//{topTracks.map(({name, artists}) => <div>{name} by {artists.map(artist => artist.name).join(', ')}</div>)}
//<pre>{JSON.stringify(data, null, 2)}</pre>
