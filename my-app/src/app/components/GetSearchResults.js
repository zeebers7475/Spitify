import { useState } from "react"
import { fetchSearchResults } from "./ApiCalls";

const token = localStorage.getItem("access_token")
const GetSearchResults = (props) => {


    if(token) {
        fetchSearchResults(props.searchingFor)
        .then((data) => {
            if(data) {
                props.changeSearchResults(data)
            }
        });
    }

    return (
        <div>
            <p>{props.searchResults}</p>
        </div>
    )
}

export default GetSearchResults;