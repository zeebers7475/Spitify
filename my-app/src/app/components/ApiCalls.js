import { profile } from "../page"

const api = "https://api.spotify.com/v1/"
const token = localStorage.getItem("access_token")

export const fetchSearchResults = async (searchingFor) => {
    let endpoint = "search?q="
    const apiUrl = encodeURI(encodeURI(`${api}${endpoint}${encodeURIComponent(searchingFor)}`))
    const categories = '&type=track&limit=5'
    try {
        const results = await fetch(apiUrl + categories, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            
        });
        const response = await results.json();
        return response;
    }   catch (err) {
            setError(err.message);
            return null;
    }
    
}

export const fetchProfile = async (setError) => {
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

export const fetchPlaylists = async () => {
    try{
        const result = await fetch(api + "me/playlists?limit=10", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const response = await result.json();
        return response;
    } catch (err) {
        console.log("Fetch Playlist Error:" + err.message)
        return null;
    }
}

export const fetchPlaylistTracks = async (playlistApi) => {
    try{
        const results = await fetch(playlistApi, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const response = await results.json()
        return response
    } catch (err) {
        console.log("Playlist Tracks Error: " + err.message);
        return null
    }
}

export const fetchCreatePlaylist = async (profile, playlistTitle, songsToAdd) => {

    const uris = songsToAdd.map(eachSong => eachSong.key)
    let playlistId

    const addItems = async (playlistId, uris) => {
        const endpoint = `playlists/${playlistId}/tracks?uris=${uris.join(',')}`;
        try {
            const results = await fetch(api + endpoint, {
                headers: { Authorization: `Bearer ${token}` },
                method: "POST",
            });
            const response = await results.json()
            return alert(response)
        } catch (err) {
            console.log("Tracks Playlist Error: " + err.message)
            return null
        }
    } 

    const endpoint = `users/${profile.id}/playlists`;
    const body = {
        "name": playlistTitle,
        "description": "",
        "public": false
    }
    try {
        const results = await fetch(api + endpoint, {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify(body),
        });
        const response = await results.json()
        console.log("Response: " + response)
        return playlistId = response.id
    } catch (err) {
        console.log("Create Playlist Error: " + err.message)
        return null
    } finally {
        addItems(playlistId, uris)
    }
}

