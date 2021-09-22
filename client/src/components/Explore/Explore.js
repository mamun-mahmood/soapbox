import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FiSearch } from 'react-icons/fi';
import HootOutside from '../HootOutside/HootOutside';
import './explore.css'

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allUploads, setAllUploads] = useState([]);
    const searchRef = useRef(null);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.get(`${BaseURL}/upload`).then((response) => {
                setAllUploads(response.data);
            })
        }
        getAllUploadData();
        searchRef.current.focus();
    }, [])

    // sorted array by views - trending first
    const byViews = allUploads.slice(0);
    byViews.sort(function (a, b) {
        return a.views - b.views;
    });

    return (
        <div className="explore start">
            <div className="search-bar">
                <input
                    ref={searchRef}
                    onChange={(event) => { setSearchTerm(event.target.value) }}
                    type="text"
                    placeholder="Search Hoots based on Hashtags, Stocks and Keywords"
                />
                <FiSearch className="search-icon" onClick={() => { searchRef.current.focus() }} />
            </div>
            <div className="hoot-profile-layout">
                {byViews.filter((hoot) => {
                    if (searchTerm === "") {
                        return hoot;
                    } else if (hoot.caption.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return hoot;
                    }
                }).map((hoot) => {
                    return (<div key={hoot.id}>
                        <HootOutside
                            hootId={hoot.id}
                            username={hoot.authorUsername}
                            mimeType={hoot.mimeType}
                            hootImgId={hoot.image}
                        />
                    </div>)
                }).reverse()}
            </div>

            <Helmet>
                <title>Explore {searchTerm} Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
            </Helmet>
        </div>
    )
}

export default Explore
