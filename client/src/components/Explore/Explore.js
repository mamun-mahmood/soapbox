import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { FiPlayCircle, FiSearch } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollLoader from '../Feed/InfiniteScrollLoader';
import HootOutside from '../HootOutside/HootOutside';
import ExploreHoot from './ExploreHoot';
import './explore.css'
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router';
import FoundUsers from '../FoundUsers';

const Explore = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [trendingHoots, setTrendingHoots] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchUsersList, setSearchUsersList] = useState([]);
    const [byDefault, setByDefault] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setpage] = useState(2);
    const [searchPage, setSearchPage] = useState(2);
    const searchRef = useRef(null);

    const history = useHistory();
    const BaseURL = process.env.REACT_APP_API_URL;
    const LIMIT = 10;

    // getting trending hoots
    useEffect(() => {
        const getTrendingHoots = async () => {
            await axios.get(`${BaseURL}/upload/trending/public/p?page=1&limit=${LIMIT}`)
                .then((response) => {
                    setTrendingHoots(response.data.results);
                });
        }

        getTrendingHoots();
        searchRef.current.focus();
    }, [])

    // if searchKeyword === empty string, setByDefault to true
    useEffect(() => {
        if (searchKeyword === "") {
            setByDefault(true);
            setSearchUsersList([]);
        }
    }, [searchKeyword])

    // fetching more trending hoots
    const fetchMoreTrendingHoots = async () => {
        await axios.get(`${BaseURL}/upload/trending/public/p?page=${page}&limit=${LIMIT}`)
            .then((response) => {
                const trendingHootsFromServer = response.data.results;

                setTrendingHoots([...trendingHoots, ...trendingHootsFromServer]);

                if (trendingHootsFromServer === 0 || trendingHootsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setpage(page + 1);
    }

    // search from DataBase
    const searchFromDb = async () => {
        setByDefault(false);

        await axios.all([
            axios.get(`${BaseURL}/upload/search/public/p?page=1&limit=${LIMIT}&keyword=${searchKeyword}`),
            // axios.get(`${BaseURL}/upload/search/user/p?page=1&limit=${LIMIT}&keyword=${searchKeyword}`),
            axios.get(`${BaseURL}/user/search?keyword=${searchKeyword}`),
        ]).then(axios.spread((res1, res2) => {
            setSearchResults(res1.data.results);
            setSearchUsersList(res2.data);
        }))

        searchRef.current.focus();
    }

    // fetching more search results
    const fetchMoreSearchResults = async () => {
        await axios.get(`${BaseURL}/upload/search/public/p?page=${searchPage}&limit=${LIMIT}&keyword=${searchKeyword}`)
            .then((response) => {
                const searchResultsFromServer = response.data.results;

                setSearchResults([...searchResults, ...searchResultsFromServer]);

                if (searchResultsFromServer === 0 || searchResultsFromServer < LIMIT) {
                    setHasMore(false);
                }
            });

        setSearchPage(searchPage + 1);
    }

    // call searchFromDb when enter is pressed
    const onEnterKey = (event) => {
        if (event.keyCode === 13) {
            searchKeyword ? searchFromDb() : toast.info(`Search field can not be empty.`);
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
                    placeholder="Search Users and Hoots based on Hashtags, Stocks and Keywords & hit enter"
                />
                <FiSearch className="search-icon" onClick={searchFromDb} />
            </div>

            <div className="search-users-list">
                {searchUsersList &&
                    searchUsersList.map((user) => {
                        return (
                            <div key={user.id} className="found-user">
                                <FoundUsers user={user} />
                            </div>
                        )
                    })
                }
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
                                    {!hoot.mimeType
                                        ?
                                        <div className="img-container">
                                            <div
                                                className="hoot-img-vertical-profile"
                                                style={{ animation: "none", backgroundColor: "#d9d1f8" }}
                                                onContextMenu={(e) => e.preventDefault()}
                                                onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${hoot.id}`) }}
                                            >
                                                {ReactPlayer.canPlay(hoot.link) &&
                                                    hoot.link.endsWith('.mp4') ||
                                                    hoot.link.endsWith('.mkv') ||
                                                    hoot.link.endsWith('.mov') ||
                                                    hoot.link.endsWith('.ogv') ||
                                                    hoot.link.endsWith('.webm') ||
                                                    hoot.link.endsWith('.mpg')
                                                    ?
                                                    <div className="vdo-container">
                                                        <video
                                                            muted
                                                            disablePictureInPicture
                                                            className="hoot-vdo-profile"
                                                            style={{ margin: "0" }}
                                                            onMouseOver={event => event.target.play()}
                                                            onMouseOut={event => event.target.pause()}
                                                        >
                                                            <source src={hoot.link} />
                                                            Your browser does not support HTML video.
                                                        </video>
                                                    </div>
                                                    :
                                                    hoot.link.endsWith('.mp3') ||
                                                        hoot.link.endsWith('.ogg') ||
                                                        hoot.link.endsWith('.wav') ||
                                                        hoot.link.endsWith('.flac') ||
                                                        hoot.link.endsWith('.aac') ||
                                                        hoot.link.endsWith('.alac') ||
                                                        hoot.link.endsWith('.dsd')
                                                        ?
                                                        <div className="vdo-container">
                                                            <video
                                                                muted
                                                                poster={`${BaseURL}/profile-pictures/${`${BaseURL}/profile-pictures/${hoot.profilePic}`}`}
                                                                className="hoot-vdo-profile"
                                                                style={{ margin: "0" }}
                                                            >
                                                                <source src={hoot.link} />
                                                                Your browser does not support HTML video.
                                                            </video>
                                                        </div>
                                                        :
                                                        ReactPlayer.canPlay(hoot.link) &&
                                                        <div className='player-profile-wrapper'>
                                                            <ReactPlayer
                                                                url={hoot.link}
                                                                className='react-player'
                                                                controls="true"
                                                                width={hoot.mimeType ? '97%' : '100%'}
                                                                height='100%'
                                                                light={true}
                                                            />
                                                        </div>
                                                }
                                            </div>
                                            <FiPlayCircle
                                                className="GIF-overlay"
                                                style={{ borderRadius: "50%" }}
                                                onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${hoot.id}`) }}
                                            />
                                        </div>
                                        :
                                        hoot.mimeType.substr(0, 5) == "audio"
                                            ? <ExploreHoot
                                                hootId={hoot.id}
                                                username={hoot.authorUsername}
                                                mimeType={hoot.mimeType}
                                                hootImgId={hoot.image}
                                            />
                                            : <HootOutside
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
                    <InfiniteScroll
                        dataLength={searchResults.length}
                        next={fetchMoreSearchResults}
                        hasMore={hasMore}
                    >
                        <div className="hoot-profile-layout">
                            {searchResults.map((hoot) => {
                                return (
                                    <div key={hoot.id}>
                                        {!hoot.mimeType
                                            ?
                                            <div className="img-container">
                                                <div
                                                    className="hoot-img-vertical-profile"
                                                    style={{ animation: "none", backgroundColor: "#d9d1f8" }}
                                                    onContextMenu={(e) => e.preventDefault()}
                                                    onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${hoot.id}`) }}
                                                >
                                                    {ReactPlayer.canPlay(hoot.link) &&
                                                        hoot.link.endsWith('.mp4') ||
                                                        hoot.link.endsWith('.mkv') ||
                                                        hoot.link.endsWith('.mov') ||
                                                        hoot.link.endsWith('.ogv') ||
                                                        hoot.link.endsWith('.webm') ||
                                                        hoot.link.endsWith('.mpg')
                                                        ?
                                                        <div className="vdo-container">
                                                            <video
                                                                muted
                                                                disablePictureInPicture
                                                                className="hoot-vdo-profile"
                                                                style={{ margin: "0" }}
                                                                onMouseOver={event => event.target.play()}
                                                                onMouseOut={event => event.target.pause()}
                                                            >
                                                                <source src={hoot.link} />
                                                                Your browser does not support HTML video.
                                                            </video>
                                                        </div>
                                                        :
                                                        hoot.link.endsWith('.mp3') ||
                                                            hoot.link.endsWith('.ogg') ||
                                                            hoot.link.endsWith('.wav') ||
                                                            hoot.link.endsWith('.flac') ||
                                                            hoot.link.endsWith('.aac') ||
                                                            hoot.link.endsWith('.alac') ||
                                                            hoot.link.endsWith('.dsd')
                                                            ?
                                                            <div className="vdo-container">
                                                                <video
                                                                    muted
                                                                    poster={`${BaseURL}/profile-pictures/${`${BaseURL}/profile-pictures/${hoot.profilePic}`}`}
                                                                    className="hoot-vdo-profile"
                                                                    style={{ margin: "0" }}
                                                                >
                                                                    <source src={hoot.link} />
                                                                    Your browser does not support HTML video.
                                                                </video>
                                                            </div>
                                                            :
                                                            ReactPlayer.canPlay(hoot.link) &&
                                                            <div className='player-profile-wrapper'>
                                                                <ReactPlayer
                                                                    url={hoot.link}
                                                                    className='react-player'
                                                                    controls="true"
                                                                    width={hoot.mimeType ? '97%' : '100%'}
                                                                    height='100%'
                                                                    light={true}
                                                                />
                                                            </div>
                                                    }
                                                </div>
                                                <FiPlayCircle
                                                    className="GIF-overlay"
                                                    style={{ borderRadius: "50%" }}
                                                    onClick={() => { history.push(`/${hoot.authorUsername}/hoot/${hoot.id}`) }}
                                                />
                                            </div>
                                            :
                                            hoot.mimeType.substr(0, 5) == "audio"
                                                ? <ExploreHoot
                                                    hootId={hoot.id}
                                                    username={hoot.authorUsername}
                                                    mimeType={hoot.mimeType}
                                                    hootImgId={hoot.image}
                                                />
                                                : <HootOutside
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
                    <div className="no-search-result">
                        No results for {searchKeyword}
                    </div>
            }

            <Helmet>
                <title>Explore {searchKeyword} Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Club</title>
            </Helmet>
        </div>
    )
}

export default Explore