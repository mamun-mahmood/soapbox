import React from 'react'

const SearchResults = ({ searchTerm, setSearchTerm }) => {
    return (
        <div>
            Search Results for Marketplace <b>{searchTerm}</b>
        </div>
    )
}

export default SearchResults
