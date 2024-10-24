import { useEffect } from "react";

const RequestAccessToken = async (updateKey) => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://localhost:3000';
    
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('code')) {
            let code = urlParams.get('code');
            let codeVerifier = localStorage.getItem('code_verifier');

            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    code_verifier: codeVerifier,
                }),
            }
            const body = await fetch('https://accounts.spotify.com/api/token', payload);
            const response = await body.json()

            updateKey(response.access_token);
            
           return localStorage.setItem('access_token', response.access_token);
            
        }
}

export default RequestAccessToken;