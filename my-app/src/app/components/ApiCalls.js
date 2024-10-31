
const api = "https://api.spotify.com/v1/"
const token = localStorage.getItem("access_token")

export const fetchSearchResults = async (searchingFor) => {
    let endpoint = "search?q="
    const apiUrl = encodeURI(encodeURI(`${api}${endpoint}${encodeURIComponent(searchingFor)}`))
    try {
        const results = await fetch(apiUrl, {
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

export const fetchProfile2 = async (token) => {
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