import codeVerifier from "./CodeVerifier";
import codeChallenge from "./CodeChallenge";

const RequestUserAccess = () => {

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;

    const redirectUri = 'http://localhost:3000';

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

export default RequestUserAccess;