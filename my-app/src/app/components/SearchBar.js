import { useState } from "react"


const SearchBar = () => {

    const [searchingFor, setSearchingFor] = useState('')

    const handleOnChange = (e) => {
        setSearchingFor(e.target.value)
    }

    return (
        <div>
            <label htmlFor="search">Search </label>
            <input type="text" id="search" name="search" value={searchingFor} onChange={handleOnChange} />
            <p>Search Input: {searchingFor}</p>
        </div>
    )

}

export default SearchBar;