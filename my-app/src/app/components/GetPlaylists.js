const GetPlaylists = (props) => {

    const validImages = (playlist) => {
        if(playlist.images && playlist.images[0].url) {
            return playlist.images[0].url;
        } else return <Image src="./public/next.svg" />
    }

    const listPlaylists = props.playlists.items.map((playlist) => {
        
        return (
        <div className="two-columns" key={playlist.id}>
            <div>
                <img src={validImages(playlist)} width="180px" />
            </div>
            <div>
                <p>Playlist Name: {playlist.name}</p>
                <p>Total Tracks: {playlist.tracks.total}</p>
            </div>
        </div>
        )
    })
    

    return (
        <div>
           <h3>Playlists:</h3>
            {listPlaylists}
        </div>
    )
}

export default GetPlaylists