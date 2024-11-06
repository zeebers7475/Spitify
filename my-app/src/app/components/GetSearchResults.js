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

    const handleOnClick = () => {
        console.log("Added to Paylist List")
    }

    const listArtists = (data) => {
        return data.artists.map((artist, index) => <li key={data.id + index}>{artist.name}</li>)
    }

    const handleSongsToAdd = (e) => {
        console.log(e.target.value)
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
                    </div>
                    <div>
                        <button onClick={handleSongsToAdd} value={`${track.id}, ${track.name}, ${track.artists.map((artist) => artist.name + ' ')} ${track.album.name}`}>+</button>
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

