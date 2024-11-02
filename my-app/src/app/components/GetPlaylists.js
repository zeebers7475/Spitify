const GetPlaylists = (props) => {

    console.log(props.playlists)
    // const listPlaylists = props.playlists.items.map((playlist) => {
    //     <div key={playlist.id}>
    //         <img src={playlist.images[0]} width="180px" />
    //         <p>Playlist Name: {playlist.name}</p>
    //         <p>Total Tracks: {playlist.tracks.total}</p>
    //     </div>
    // })

    return (
        <div>
           <h3>Playlists:</h3>
            {/* {listPlaylists} */}
        </div>
    )
}

export default GetPlaylists