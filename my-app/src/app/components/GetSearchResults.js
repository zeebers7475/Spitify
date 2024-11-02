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
                <div key={track.id}>
                    <p>Song: {track.name}</p>
                    <ul>Artists: {track.artists.map((artist, index) => <li key={track.id + index}>{artist.name}</li>)}</ul>
                    <p>Album: {track.album.name}</p>
                </div>
            )})

        return (
            <div>
            <h3>Results</h3>
            <button onClick={handleOnClick}>{searchList}</button>
        </div>
        )
    }
}

export default GetSearchResults;

