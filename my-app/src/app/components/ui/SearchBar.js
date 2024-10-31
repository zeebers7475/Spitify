import { useState } from "react"
import GetSearchResults from "../GetSearchResults"


const SearchBar = (props) => {

    const handleOnChange = (e) => {
        props.changeSearchingFor(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(props.searchingFor)
        if(props.searchingFor === '') {
            props.changeSearchResults("Need something to search")
        } else {
            GetSearchResults();
        }
        

    }

    return (
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="search" hidden={true}>Search </label><br/>
            <input type="text" id="search" name="search" value={props.searchingFor} onChange={handleOnChange} placeholder="Search"/>
            <input className="primary-button" type="submit" value="Search" name="search" id="search"  />
        </form>
    )

}

export default SearchBar;