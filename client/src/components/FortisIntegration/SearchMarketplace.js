import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { SoapboxTooltip } from '../../components/SoapboxTooltip'

const SearchMarketplace = ({
    // searchTerm,
    // setSearchTerm,
    // setFinalSearchTerm
}) => {
    // const validateSearch = () => {
    //     searchTerm.length === 0
    //         ? toast.info("Please enter a search term")
    //         : searchTerm.length > 3
    //             ? setFinalSearchTerm(searchTerm)
    //             : toast.info("Search term must be at least 3 characters long");
    // }

    // const onEnterKey = (event) => {
    //     if (event.keyCode === 13) {
    //         validateSearch();
    //     }
    // }

    return (
        <div className="m-searchbar">
            <input
                type="text"
                placeholder="Search Marketplace"
                className='input-new-style m-s'
            // onChange={(event) => { setSearchTerm(event.target.value) }}
            // onKeyDown={(event) => { onEnterKey(event) }}
            />
            <SoapboxTooltip title="search" placement="bottom">
                <div>
                    <FiSearch className="m-s-i" />
                    {/* <FiSearch className="m-s-i" onClick={validateSearch} /> */}
                </div>
            </SoapboxTooltip>
        </div>
    )
}

export default SearchMarketplace
