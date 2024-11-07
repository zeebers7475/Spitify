"use client"

import { useState, useEffect } from "react"
import { fetchProfile } from "./ApiCalls";

const GetProfile = (props) => {

    const token = localStorage.getItem("access_token");
    const[error, setError] = useState(null);

    useEffect(() => {
        if(token) {
            fetchProfile(setError).then((data) => {
                if(data) {
                    props.changeProfile(data);
                }
            });
        }
    }, [token])

    if(error) return <p>Get Profile Error: {error}</p>;
    if(!props.profile) return <p>Loading...</p>;

    return (
        <div>
            <h1>Profile</h1>
            <p>{props.profile.display_name}</p>
            <img src={props.profile.images[0].url} />
            
        </div>
    )
}

export default GetProfile;