import React, { Fragment, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import SideBarOption from './SideBarOption'
import { BsLightning } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import { FiHome, FiHash } from 'react-icons/fi'
import { BiMessageDetail, BiUser, BiDollar, BiWallet } from 'react-icons/bi'
import './sidebar.css';

const SideBar = () => {
    const [mainActive, setMainActive] = useState("active");
    const [hashtags, setHashtags] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [allUploads, setAllUploads] = useState([]);
    const [myListActive, setMyListActive] = useState("");
    const history = useHistory()

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getAllUploadData = async () => {
            await axios.get(`${BaseURL}/upload`).then((response) => {
                setAllUploads(response.data);
            })
        }
        getAllUploadData();
    }, [])

    // Hashtags
    useEffect(() => {
        const getHashtagsData = async () => {
            await axios.get(`${BaseURL}/hashtags`)
                .then((response) => {
                    setHashtags(response.data);
                });
        }
        getHashtagsData();
    }, [])

    const updateTotalHashtagViews = useCallback((hashtag, totalViews) => {
        axios.put(`${BaseURL}/hashtags`, {
            hashtag: hashtag,
            totalViews: totalViews
        })
    }, [])

    hashtags.map((hashtag) => {
        var totalViews = 0;
        allUploads.map((upload) => {
            (upload.caption).includes(hashtag.hashtag)
                ?
                (totalViews += upload.views, updateTotalHashtagViews(hashtag.hashtag, totalViews))
                : null
        })
    })

    // sorted array by views - trending first
    const byHashtagViews = hashtags.slice(0);
    byHashtagViews.sort(function (a, b) {
        return a.totalViews - b.totalViews;
    });

    // Stocks
    useEffect(() => {
        const getStocksData = async () => {
            await axios.get(`${BaseURL}/stocks`)
                .then((response) => {
                    setStocks(response.data);
                });
        }
        getStocksData();
    }, [])

    const updateTotalStockViews = useCallback((stock, totalViews) => {
        axios.put(`${BaseURL}/stocks`, {
            stock: stock,
            totalViews: totalViews
        })
    }, [])

    stocks.map((stock) => {
        var totalViews = 0;
        allUploads.map((upload) => {
            (upload.caption).includes(stock.stock)
                ?
                (totalViews += upload.views, updateTotalStockViews(stock.stock, totalViews))
                : null
        })
    })

    // sorted array by views - trending first
    const byStockViews = stocks.slice(0);
    byStockViews.sort(function (a, b) {
        return a.totalViews - b.totalViews;
    });

    var username = "";
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    if (userInfo) {
        username = userInfo.username;
    }

    return (
        <div className="sidebar start">
            <ui style={{ position: "fixed" }}>
                <div className="scrollable">
                    <div className="toggle">
                        <span
                            className={mainActive}
                            onClick={() => {
                                setMainActive("active");
                                setMyListActive("");
                            }}
                        >
                            Main
                        </span>
                        <div className="dot">
                            •
                        </div>
                        <span
                            className={myListActive}
                            onClick={() => {
                                setMyListActive("active");
                                setMainActive("");
                            }}
                        >
                            My List
                        </span>
                    </div>
                    <SideBarOption
                        option="Home"
                        link="/home"
                        Icon={FiHome}
                    />
                    <SideBarOption
                        option="Profile"
                        link={`/profile/${username}`}
                        Icon={BiUser}
                    />
                    <SideBarOption
                        option="Explore"
                        link="/explore"
                        Icon={BsLightning}
                    />
                    <SideBarOption
                        option="Hashtags"
                        Icon={FiHash}
                        link=""
                        looks={"looks"}
                    />
                    <li>
                        <hr className="my-2" />
                    </li>
                    <li>
                        <div className="hashtags">
                            {byHashtagViews.filter((hashtag) => {
                                if (hashtag.totalViews !== 0) {
                                    return hashtag
                                }
                            }).slice(0, 8).map((hashtag) => {
                                return (<div key={hashtag.id}>
                                    <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                        onClick={() => history.push(`/hashtags/${(hashtag.hashtag).replace('#', '')}`)}>{hashtag.hashtag}
                                    </small>
                                </div>)
                            }).reverse()}
                        </div>
                    </li>

                    <SideBarOption
                        option="Stocks"
                        Icon={BiDollar}
                        link=""
                        looks={"looks"}
                    />
                    <li>
                        <hr className="my-2" />
                    </li>
                    <li>
                        <div className="hashtags">
                            {byStockViews.filter((stock) => {
                                if (stock.totalViews !== 0) {
                                    return stock
                                }
                            }).slice(0, 8).map((stock) => {
                                return (<div key={stock.id}>
                                    <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                        onClick={() => history.push(`/stocks/${(stock.stock).replace('$', '')}`)}>{stock.stock}
                                    </small>
                                </div>)
                            }).reverse()}
                        </div>
                    </li>
                    <SideBarOption
                        option="Private Messages"
                        Icon={BiMessageDetail}
                        link="/private-message"
                    />
                    <SideBarOption
                        option="XMG Wallet"
                        Icon={BiWallet}
                        link="/xmg-wallet"
                    />
                    <li>
                        <hr className="my-2" />
                    </li>

                    <li>
                        <small className="info cursor-pointer">About</small>{" "}
                        <small className="info cursor-pointer">Fortis</small>{" "}
                        <small className="info cursor-pointer">Contact</small>
                    </li>
                    <li>
                        <small className="info cursor-pointer">Privacy Policy</small>
                    </li>
                    <li>
                        <small className="info cursor-pointer">Terms Of Service</small>
                    </li>
                    <div className="megahoot-com">
                        <small className="info cursor-pointer">
                            <a href="https://www.megahoot.com/" target="_blank" rel="noopener noreferrer">
                                MegaHoot Technologies, Inc
                            </a>
                        </small>
                    </div>
                    <li>
                        <small className="info">&copy; Copyright 2021 MegaHoot Technologies, Inc</small>
                    </li>
                </div>
            </ui>
        </div>
    )
}

export default SideBar
