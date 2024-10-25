"use client"

import { useState, useEffect } from "react"

const GetProfile = (props) => {

    const token = props.token;
    const[profile, setProfile] = useState(null);
    const[error, setError] = useState(null);

    const fetchProfile = async (token) => {
        try {
            const result = await fetch("https://spotify.com/v1/me", {
                method: "GET",
                headers: { Aithorization: `Bearer ${token}` },
            });
            const response = await result.json();
            return response;
        } catch (err) {
            setError(err.message);
            return null;
        }
    }

    useEffect(() => {
        if(token) {
            fetchProfile(token).then((data) => {
                if(data) {
                    setProfile(data);
                }
            });
        }
    }, [token])

    if(error) return <p>Error: {error}</p>;
    if(!profile) return <p>Loading...</p>;

    return (
        <div>
            <h1>Profile</h1>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    )
}

export default GetProfile;