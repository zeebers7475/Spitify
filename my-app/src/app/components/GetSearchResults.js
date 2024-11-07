import { useEffect } from "react"
import { fetchSearchResults } from "./ApiCalls";

const token = localStorage.getItem("access_token")
const GetSearchResults = (props) => {


    useEffect(() => {
        if(token && props.allowSearch) {
            fetchSearchResults(props.searchingFor)
            .then((data) => {
                if(data) {
                    props.changeSearchResults(data.tracks.items)
                    props.toggleAllowSearch(false);
                }
            });
        }
    }, [props.allowSearch])

    const listArtists = (data) => {
        return data.artists.map((artist, index) => <li key={data.id + index}>{artist.name}</li>)
    }

    const handleSongsToAdd = (e) => {
        const uri = e.target.dataset.trackUri;
        const name = e.target.dataset.trackName;
        const artists = e.target.dataset.trackArtists;
        const albumName = e.target.dataset.albumName;

        let songToAdd = <div key={uri} className="search-result">
            <p>Song: {name}</p>
            <ul>Artists: {artists}</ul>
            <p>Album: {albumName}</p>
        </div>

        props.changeSongsToAdd(songToAdd)
        
    }
    
    if(!props.searchResults) {
        return (
            <div>
            <h3>Results</h3>
            <p>Loading...</p>
        </div>
        )
    } else {
        const br = <br />;
        const searchList = props.searchResults.map((track) => {
            return (
                <div className="search-result" key={track.id}>
                    <div>
                        <p>Song: {track.name}</p>
                        <ul>Artists: {listArtists(track)}</ul>
                        <p>Album: {track.album.name}</p>
                        <p>uri {track.uri}</p>
                    </div>
                    <div>
                        <button onClick={handleSongsToAdd} data-track-id={track.id} data-track-name={track.name} data-track-artists={track.artists.map(artist => artist.name)} data-album-name={track.album.name} data-track-uri={track.uri}>
                            +
                        </button>
                    </div>
                    
                </div>
            )})

        return (
            <div>
            <h3>Results</h3>
            <div>{searchList}</div>
        </div>
        )
    }
}

export default GetSearchResults;

//track.uri
//spotify:track:36bKxP866Ig6TRsl1e1gpg