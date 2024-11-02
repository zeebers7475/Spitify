

const RequestAccessToken = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://localhost:3000';

    const getToken = async code => {

        // stored in the previous step
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
      
        const body = await fetch("https://accounts.spotify.com/api/token", payload)
        try {
            const response = await body.json();
            return localStorage.setItem('access_token', response.access_token);
            
        } catch (err) {
            console.error("Error fetching access token:", err.message);
        } finally {
            urlParams.delete('code');
            window.history.replaceState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
        }

    }

    if(urlParams.get("code")) {
        let code = urlParams.get('code');
        getToken(code)
    }
}

export default RequestAccessToken;