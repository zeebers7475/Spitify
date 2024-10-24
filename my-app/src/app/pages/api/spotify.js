

const FetchProfile = async (apiKey) => {
    console.log(apiKey)
    const result = await fetch("https://spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` }
    });
      let res = await result.json()
      console.log(res)
      setData(res)
  }

export default FetchProfile;