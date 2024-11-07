import { useState } from "react"
import GetSearchResults from "../GetSearchResults"


const SearchBar = (props) => {

    const handleOnChange = (e) => {
        props.changeSearchingFor(e.target.value)
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if(props.searchingFor === '') {
            alert("Please enter something to search")
            return null
        } else {
            props.toggleAllowSearch(true)
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