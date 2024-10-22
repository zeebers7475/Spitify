"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';

export default function Home() {
  const apiKey= process.env.SPOTIFY_API_KEY;
  const apiPrefix = "https://api.spotify.com/v1/"
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const fetchedTracks = await getTopTracks();
      setTopTracks(fetchedTracks);
    }
    
    fetchTracks();
  }, []);




  const connectApi = async (endpoint, method, body) => {
    const res = await fetch(apiPrefix + endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }

  

  const getTopTracks = async () => {
    return (await connectApi('me/top/tracks?time_range=long_term&limit=5', 'GET')).items;
  } 

  return (
    <div>
      <h1>Spitify</h1>
      {topTracks?.map(({name, artists}) => <div>{name} by {artists.map(artist => artist.name).join(', ')}</div>)}
    </div>
  )
}

//{topTracks.map(({name, artists}) => <div>{name} by {artists.map(artist => artist.name).join(', ')}</div>)}
