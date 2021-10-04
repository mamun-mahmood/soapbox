import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FiSearch } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollLoader from '../Feed/InfiniteScrollLoader';
import HootOutside from '../HootOutside/HootOutside';
import EndMsg from '../Feed/EndMsg'
import './explore.css'
import ExploreHoot from './ExploreHoot';

const Explore = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [trendingHoots, setTrendingHoots] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [byDefault, setByDefault] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    // const [searchPage, setSearchPage] = useState(2);
    const searchRef = useRef(null);

    const BaseURL = process.env.REACT_APP_API_URL;
    const LIMIT = 10;

    useEffect(() => {
        const getTrendingHoots = async () => {
            await axios.get(`${BaseURL}/upload/trending/p?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setTrendingHoots(response.data.results);
                });
        }

        getTrendingHoots();
        searchRef.current.focus();
    }, [])

    useEffect(() => {
        if (searchKeyword === "") {
            setByDefault(true);
        }
    }, [searchKeyword])

    const fetchMoreTrendingHoots = async () => {
        await axios.get(`${BaseURL}/upload/trending/p?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const trendingHootsFromServer = response.data.results;

                setTrendingHoots([...trendingHoots, ...trendingHootsFromServer]);

                if (trendingHootsFromServer === 0 || trendingHootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    }

    const searchFromDb = async () => {
        setByDefault(false);
        // await axios.post(`${BaseURL}/upload/search/p?page=${page}&limit=${LIMIT}&keyword=${searchKeyword}`)
        await axios.post(`${BaseURL}/upload/search?keyword=${searchKeyword}`)
            .then((response) => {
                setSearchResults(response.data);
            });
        searchRef.current.focus();
    }

    // const fetchMoreSearchResults = async () => {
    //     await axios.get(`${BaseURL}/upload/search/p?page=${searchPage}&limit=${LIMIT}&keyword=${searchKeyword}`)
    //         .then((response) => {
    //             const searchResultsFromServer = response.data.results;

    //             setSearchResults([...searchResults, ...searchResultsFromServer]);

    //             if (searchResultsFromServer === 0 || searchResultsFromServer < LIMIT) {
    //                 setHasMore(false);
    //             }
    //         });

    //     setSearchPage(searchPage + 1);
    // }

    const onEnterKey = (event) => {
        if (event.keyCode === 13) {
            searchFromDb();
        }
        searchRef.current.focus();
    }

    return (
        <div className="explore start">
            <div className="search-bar">
                <input
                    ref={searchRef}
                    onChange={(event) => { setSearchKeyword(event.target.value) }}
                    onKeyDown={(event) => { onEnterKey(event) }}
                    type="text"
                    placeholder="Search Hoots based on Hashtags, Stocks and Keywords & hit enter"
                />
                <FiSearch className="search-icon" onClick={searchFromDb} />
            </div>

            {byDefault
                ?
                <InfiniteScroll
                    dataLength={trendingHoots.length}
                    next={fetchMoreTrendingHoots}
                    hasMore={hasMore}
                    loader={<InfiniteScrollLoader />}
                >
                    <div className="hoot-profile-layout">
                        {trendingHoots.map((hoot) => {
                            return (
                                <div key={hoot.id}>
                                    {hoot.mimeType.substr(0, 5) == "audio"
                                        ?
                                        <ExploreHoot
                                            hootId={hoot.id}
                                            username={hoot.authorUsername}
                                            mimeType={hoot.mimeType}
                                            hootImgId={hoot.image}
                                        />
                                        :
                                        <HootOutside
                                            hootId={hoot.id}
                                            username={hoot.authorUsername}
                                            mimeType={hoot.mimeType}
                                            hootImgId={hoot.image}
                                        />
                                    }

                                </div>)
                        })}
                    </div>
                </InfiniteScroll>
                :
                searchResults.length > 0
                    ?
                    <div className="hoot-profile-layout">
                        {searchResults.map((hoot) => {
                            return (
                                <div key={hoot.id}>
                                    {hoot.mimeType.substr(0, 5) == "audio"
                                        ?
                                        <ExploreHoot
                                            hootId={hoot.id}
                                            username={hoot.authorUsername}
                                            mimeType={hoot.mimeType}
                                            hootImgId={hoot.image}
                                        />
                                        :
                                        <HootOutside
                                            hootId={hoot.id}
                                            username={hoot.authorUsername}
                                            mimeType={hoot.mimeType}
                                            hootImgId={hoot.image}
                                        />
                                    }

                                </div>)
                        })}
                    </div>
                    :
                    <div className="no-search-result">
                        No results for {searchKeyword}
                    </div>
            }

            <Helmet>
                <title>Explore {searchKeyword} Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels</title>
            </Helmet>
        </div>
    )
}

export default Explore


// search results in infinite scroll and pagnation 

{/* <InfiniteScroll
                        dataLength={searchResults.length}
                        next={fetchMoreSearchResults}
                        hasMore={hasMore}
                    // loader={trendingHoots.length > 10 && <InfiniteScrollLoader />}
                    >
                        <div className="hoot-profile-layout">
                            {searchResults.map((hoot) => {
                                return (
                                    <div key={hoot.id}>
                                        {hoot.mimeType.substr(0, 5) == "audio"
                                            ?
                                            <ExploreHoot
                                                hootId={hoot.id}
                                                username={hoot.authorUsername}
                                                mimeType={hoot.mimeType}
                                                hootImgId={hoot.image}
                                            />
                                            :
                                            <HootOutside
                                                hootId={hoot.id}
                                                username={hoot.authorUsername}
                                                mimeType={hoot.mimeType}
                                                hootImgId={hoot.image}
                                            />
                                        }

                                    </div>)
                            })}
                        </div>
                    </InfiniteScroll> */}