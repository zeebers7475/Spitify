
const RequestUserAuth = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const redirectUri = 'http://localhost:3000';
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;


        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }
          
        const codeVerifier  = generateRandomString(64);
        
        const sha256 = async (plain) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }
        
        const base64encode = (input) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
              .replace(/=/g, '')
              .replace(/\+/g, '-')
              .replace(/\//g, '_');
        }
        
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);
        
        
        
        const scope = 'user-read-private user-read-email';
        const authUrl = new URL("https://accounts.spotify.com/authorize")
        
        // generated in the previous step
        window.localStorage.setItem('code_verifier', codeVerifier);
        
        const params =  {
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

export default RequestUserAuth;