
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

