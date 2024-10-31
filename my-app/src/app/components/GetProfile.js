"use client"

import { useState, useEffect } from "react"

const GetProfile = (props) => {

    const token = localStorage.getItem("access_token");
    const[profile, setProfile] = useState(null);
    const[error, setError] = useState(null);

    const fetchProfile = async (token) => {
        try {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const response = await result.json();
            return response;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }

    useEffect(() => {
        console.log("useEffect: " + token)
        if(token) {
            fetchProfile(token).then((data) => {
                if(data) {
                    setProfile(data);
                }
            });
        }
    }, [token])

    if(error) return <p>Get Profile Error: {error}</p>;
    if(!profile) return <p>Loading...</p>;
    console.log(profile)

    return (
        <div>
            <h1>Profile</h1>
            <p>{profile.display_name}</p>
            <img src={profile.images[0].url} />
            
        </div>
    )
}

export default GetProfile;