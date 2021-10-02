import React, { Fragment, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import SideBarOption from './SideBarOption'
import { BsLightning } from 'react-icons/bs'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { FiHome, FiHash, FiSearch, FiShield } from 'react-icons/fi'
import { RiShieldFlashLine } from 'react-icons/ri'
import { IoCloseOutline } from 'react-icons/io5'
import { BiMessageDetail, BiUser, BiDollar, BiWallet } from 'react-icons/bi'
import './sidebar.css';
// import toast from 'react-hot-toast'
import SuggestedFollow from './SuggestedFollow'
import SuggestedHoots from './SuggestedHoots'

const SideBar = () => {
    // const [mainActive, setMainActive] = useState("active");
    // const [hashtags, setHashtags] = useState([]);
    // const [stocks, setStocks] = useState([]);
    // const [allUploads, setAllUploads] = useState([]);
    // const [myListActive, setMyListActive] = useState("");
    const [myList, setMyList] = useState(false)
    // const [searchHashtagTerm, setSearchHashtagTerm] = useState("");
    // const [searchStockTerm, setSearchStockTerm] = useState("");
    // const history = useHistory()

    // const history = useHistory();

    // if (myList) {
    //     setTimeout(() => {
    //         history.push('/mylist');
    //     }, 250);
    // }
    // else {
    //     setTimeout(() => {
    //         history.push('/');
    //     }, 250);
    // }
    // const BaseURL = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    //     const getAllUploadData = async () => {
    //         await axios.get(`${BaseURL}/upload`).then((response) => {
    //             setAllUploads(response.data);
    //         })
    //     }
    //     getAllUploadData();
    // }, [])

    // Hashtags
    // useEffect(() => {
    //     const getHashtagsData = async () => {
    //         await axios.get(`${BaseURL}/hashtags`)
    //             .then((response) => {
    //                 setHashtags((response.data).reverse());
    //             });
    //     }

    //     try {
    //         getHashtagsData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    // const defaultHashtags = [
    //     "#funny",
    //     "#nft",
    //     "#wallstreet",
    //     "#realestate",
    //     "#fitness",
    //     "#fashion",
    //     "#beauty"
    // ]

    // const updateTotalHashtagViews = useCallback((hashtag, totalViews) => {
    //     axios.put(`${BaseURL}/hashtags`, {
    //         hashtag: hashtag,
    //         totalViews: totalViews
    //     })
    // }, [])

    // hashtags.map((hashtag) => {
    //     var totalViews = 0;
    //     allUploads.map((upload) => {
    //         (upload.caption).includes(hashtag.hashtag)
    //             ?
    //             (totalViews += upload.views, updateTotalHashtagViews(hashtag.hashtag, totalViews))
    //             : null
    //     })
    // })

    // // sorted array by views - trending first
    // const byHashtagViews = hashtags.slice(0);
    // byHashtagViews.sort(function (a, b) {
    //     return a.totalViews - b.totalViews;
    // });

    // Stocks
    // useEffect(() => {
    //     const getStocksData = async () => {
    //         await axios.get(`${BaseURL}/stocks`)
    //             .then((response) => {
    //                 setStocks((response.data).reverse());
    //             });
    //     }

    //     try {
    //         getStocksData();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    // const defaultStocks = [
    //     "$AAPL",
    //     "$FB",
    //     "$AMZN",
    //     "$IBM",
    //     "$BTC",
    //     "$ETH",
    //     "$PLTR",
    //     "$GM",
    //     "$F",
    //     "$TSLA"
    // ]

    // const updateTotalStockViews = useCallback((stock, totalViews) => {
    //     axios.put(`${BaseURL}/stocks`, {
    //         stock: stock,
    //         totalViews: totalViews
    //     })
    // }, [])

    // stocks.map((stock) => {
    //     var totalViews = 0;
    //     allUploads.map((upload) => {
    //         (upload.caption).includes(stock.stock)
    //             ?
    //             (totalViews += upload.views, updateTotalStockViews(stock.stock, totalViews))
    //             : null
    //     })
    // })

    // // sorted array by views - trending first
    // const byStockViews = stocks.slice(0);
    // byStockViews.sort(function (a, b) {
    //     return a.totalViews - b.totalViews;
    // });

    var username = "";
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    if (userInfo) {
        username = userInfo.username;
    }

    return (
        <div className="sidebar start">
            <ui style={{ position: "fixed" }}>
                <div className="scrollable">
                    <li>
                        <input
                            type="checkbox"
                            name="gender-toggle"
                            id="gender-toggle"
                            className="toggle-container toggle-container-light"
                            onChange={() => setMyList(!myList)}
                        />
                        <label htmlFor="gender-toggle" className="toggle-button">
                            <span
                                id="main"
                                className="d-flex align-items-center justify-content-center"
                            >
                                Main
                            </span>
                            <span
                                id="myList"
                                className="d-flex align-items-center justify-content-end"
                            >
                                My List
                            </span>
                        </label>
                    </li>

                    <SideBarOption
                        option="Home"
                        // link="/home"
                        link="/"
                        Icon={FiHome}
                    />

                    <SideBarOption
                        option="Private Channels"
                        Icon={RiShieldFlashLine}
                    // link={`/private/channels/${username}`}
                    />

                    {userInfo
                        ? <SideBarOption
                            option="Profile"
                            link={`/profile/${username}`}
                            Icon={BiUser}
                        />
                        : null
                    }

                    <SideBarOption
                        option="Explore"
                        link="/explore"
                        Icon={BsLightning}
                    />

                    {/* <SideBarOption
                        option="Hashtags"
                        Icon={FiHash}
                        link=""
                        looks={"looks"}
                    /> */}

                    {/* <li>
                        <div className="search-on-sidebar">
                            <input
                                value={searchHashtagTerm}
                                onChange={(event) => { setSearchHashtagTerm(event.target.value) }}
                                type="text"
                                placeholder="Search hashtags"
                            />
                            {searchHashtagTerm &&
                                <IoCloseOutline className="search-close-on-sidebar"
                                    onClick={() => { setSearchHashtagTerm("") }}
                                />
                            }
                        </div>
                    </li> */}

                    {/* <li>
                        <hr className="my-2" />
                    </li> */}

                    {/* <li>
                        <div className="hashtags">
                            {searchHashtagTerm
                                ? hashtags.filter((hashtag) => {
                                    // this displays hashtags respective to search term
                                    if (searchHashtagTerm === "") {
                                        return hashtag;
                                    } else if (hashtag.hashtag.toLowerCase().includes(searchHashtagTerm.toLowerCase())) {
                                        return hashtag;
                                    }
                                }).slice(0, 8).map((hashtag) => {
                                    return (<div key={hashtag.id}>
                                        <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                            onClick={() => history.push(`/hashtags/${(hashtag.hashtag).replace('#', '')}`)}>{hashtag.hashtag.toLowerCase()}
                                        </small>
                                    </div>)
                                })
                                :
                                defaultHashtags.slice(0, 8).map((hashtag, index) => {
                                    return (<div key={index}>
                                        <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                            onClick={() => history.push(`/hashtags/${(hashtag).replace('#', '')}`)}>{hashtag.toLowerCase()}
                                        </small>
                                    </div>)
                                })
                            }
                        </div>
                    </li> */}

                    {/* <SideBarOption
                        option="Stocks"
                        Icon={BiDollar}
                        link=""
                        looks={"looks"}
                    /> */}

                    {/* <li>
                        <div className="search-on-sidebar">
                            <input
                                value={searchStockTerm}
                                onChange={(event) => { setSearchStockTerm(event.target.value) }}
                                type="text"
                                placeholder="Search stocks"
                            />
                            {searchStockTerm &&
                                <IoCloseOutline
                                    className="search-close-on-sidebar"
                                    onClick={() => { setSearchStockTerm("") }}
                                />
                            }
                        </div>
                    </li> */}

                    {/* <li>
                        <hr className="my-2" />
                    </li> */}

                    {/* <li>
                        <div className="hashtags">
                            {searchStockTerm
                                ? stocks.filter((stock) => {
                                    // this filters decimal number stocks
                                    const regex = /\d/;
                                    if (regex.test(stock.stock) === false) {
                                        return stock
                                    }
                                }).filter((stock) => {
                                    // this displays stocks respective to search term
                                    if (searchStockTerm === "") {
                                        return stock;
                                    } else if (stock.stock.toLowerCase().includes(searchStockTerm.toLowerCase())) {
                                        return stock;
                                    }
                                }).slice(0, 8).map((stock) => {
                                    return (<div key={stock.id}>
                                        <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                            onClick={() => history.push(`/stocks/${(stock.stock).replace('$', '')}`)}>{stock.stock.toUpperCase()}
                                        </small>
                                    </div>)
                                })
                                : defaultStocks.filter((stock) => {
                                    const regex = /\d/;
                                    if (regex.test(stock) === false) {
                                        return stock
                                    }
                                }).slice(0, 10).map((stock, index) => {
                                    return (<div key={index}>
                                        <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                            onClick={() => history.push(`/stocks/${(stock).replace('$', '')}`)}>{stock.toUpperCase()}
                                        </small>
                                    </div>)
                                })
                            }
                        </div>
                    </li> */}

                    {/* suggested Users  */}
                    <div style={{ paddingLeft: "1rem" }}>
                        <li>
                            <small style={{ marginLeft: "-0.5rem" }} className="info" >Suggested Follows</small>{" "}
                        </li>

                        {/* for development  */}
                        {/* <SuggestedFollow suggestedUsername={"hrshmistry"} />
                        <SuggestedFollow suggestedUsername={"john"} />
                        <SuggestedFollow suggestedUsername={"hey"} />
                        <SuggestedFollow suggestedUsername={"laptop"} /> */}

                        {/* for production  */}
                        <SuggestedFollow suggestedUsername={"fitness"} />
                        <SuggestedFollow suggestedUsername={"americanmuscle"} />
                        <SuggestedFollow suggestedUsername={"luxury"} />
                        <SuggestedFollow suggestedUsername={"crossfit"} />
                    </div>

                    {/* suggested hoots  */}
                    <div style={{ paddingLeft: "1rem" }}>
                        <li>
                            <small style={{ marginLeft: "-0.5rem" }} className="info" >Suggested Hoots</small>{" "}
                        </li>
                        <SuggestedHoots />
                    </div>

                    <li>
                        <NavLink
                            style={{ padding: "0.1rem 0.5rem" }}
                            activeClassName={"Private Messages" === "Home" ? null : "sidebar-option-active"}
                            to="/private-messages"
                        >
                            <span>Private Messages</span>
                        </NavLink>
                    </li>

                    <li>
                        <a
                            style={{ padding: "0.1rem 0.5rem" }}
                            activeClassName="sidebar-option-active"
                            href="https://fortisab.com/"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <span>Fortis Auction Blockmarket</span>
                        </a>
                    </li>

                    <li>
                        <a
                            style={{ padding: "0.1rem 0.5rem" }}
                            activeClassName="sidebar-option-active"
                            href="https://megahoot.org/"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <span>XMG Wallet</span>
                        </a>
                    </li>

                    <li>
                        <a
                            style={{ padding: "0.1rem 0.5rem" }}
                            activeClassName="sidebar-option-active"
                            href="https://megahootvault.com/"
                            target="_blank" rel="noopener noreferrer"
                        >
                            <span>Megahoot Vault</span>
                        </a>
                    </li>

                    <li>
                        <hr className="my-2" />
                    </li>

                    <div style={{ paddingLeft: "0.5rem" }}>
                        <li>
                            <small className="info cursor-pointer" >About</small>{" "}
                            <small className="info cursor-pointer">Contact</small>
                        </li>

                        <div className="megahoot-com">
                            <small className="info cursor-pointer">
                                <Link to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </small>
                        </div>

                        <div className="megahoot-com">
                            <small className="info cursor-pointer">
                                <Link to="/TOS">
                                    Terms Of Service
                                </Link>
                            </small>
                        </div>

                        <div className="megahoot-com">
                            <small className="info cursor-pointer">
                                <a href="https://www.megahoot.com/" target="_blank" rel="noopener noreferrer">
                                    MegaHoot Technologies, Inc
                                </a>
                            </small>
                        </div>

                        <li>
                            <small className="info" style={{ paddingBottom: "1rem" }}>&copy; 2021 MegaHoot Technologies, Inc</small>
                        </li>
                    </div>
                </div>
            </ui>
        </div>
    )
}

export default SideBar
