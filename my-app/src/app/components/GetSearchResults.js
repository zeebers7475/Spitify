import { useEffect } from "react"
import { fetchSearchResults } from "./ApiCalls";

const token = localStorage.getItem("access_token")
const GetSearchResults = (props) => {


    useEffect(() => {
        if(token && props.allowSearch) {
            fetchSearchResults(props.searchingFor)
            .then((data) => {
                if(data) {
                    console.log(data)
                    props.changeSearchResults(data)
                    props.toggleAllowSearch(false);
                }
            });
        }
    }, [props.allowSearch])
    
    return (
        <div>
            <h3>Results</h3>
            <p>{props.searchResults}</p>
        </div>
    )
}

export default GetSearchResults;