import React, { useState } from 'react'
import { FiHome, FiHash } from 'react-icons/fi'
import { BiMessageDetail, BiUser, BiDollar, BiWallet } from 'react-icons/bi'
import { BsLightning } from 'react-icons/bs'
import SideBarOption from './SideBarOption'
import './sidebar.css';
import { Link, useHistory } from 'react-router-dom'

const SideBar = () => {
    const [mainActive, setMainActive] = useState("active");
    const [myListActive, setMyListActive] = useState("");
    const history = useHistory()

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
                        link="/hashtags"
                        looks={"looks"}
                    />
                    <li>
                        <hr className="my-2" />
                    </li>
                    <li>
                        <div className="hashtags">
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#funny").replace('#', '')}`)}>#funny
                            </small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#earth").replace('#', '')}`)}>#earth
                            </small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#race").replace('#', '')}`)}>#race
                            </small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#life").replace('#', '')}`)}>#life
                            </small>
                            <br />
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#workout").replace('#', '')}`)}>#workout
                            </small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#beauty").replace('#', '')}`)}>#beauty
                            </small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end"
                                onClick={() => history.push(`/hashtags/${("#sports").replace('#', '')}`)}>#sports
                            </small>
                        </div>
                    </li>

                    <SideBarOption
                        option="Stocks"
                        Icon={BiDollar}
                        link="/stocks"
                        looks={"looks"}
                    />
                    <li>
                        <hr className="my-2" />
                    </li>
                    <li>
                        <div className="hashtags">
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end">$TWTR</small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end">$AAPL</small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end">$SPBX</small>
                            <small className="badge-hashtag outline-badge-hashtags d-flex flex-end">$TSLA</small>
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
                    {/* <SideBarOption
                    option="XMG Wallet"
                    Icon={BiMessageDetail}
                /> */}
                    {/* <SideBarOption
                    option="Notifications"
                    Icon={BiBell}
                />
                <SideBarOption
                    option="Favorites"
                    Icon={FiAward}
                /> */}
                    {/* <SideBarOption option="Bookmarks" Icon={FiBookmark} /> */}
                    {/* <SideBarOption option="Lists" Icon={BiListUl} /> */}
                    {/* <SideBarOption option="More" Icon={FiMoreHorizontal} /> */}

                    {/* <div className="btn-XMG">
                    <Link to="">
                        Connect XMG Wallet
                    </Link>
                </div> */}
                    {/* <div className="btn-hoot">
                    <Link to="/create">
                        Hoot
                    </Link>
                </div> */}

                    {/* <li>
                    <hr className="my-2" />
                </li> */}
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
