import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { FiHome, FiHash, FiBookmark, FiMoreHorizontal, FiAward } from 'react-icons/fi'
import { BiMessageDetail, BiBell, BiUser, BiListUl, BiDollar, BiWallet } from 'react-icons/bi'
import { BsLightning } from 'react-icons/bs'
import SideBarOption from './SideBarOption'
import './sidebar.css';

const SideBar = () => {
    const [mainActive, setMainActive] = useState("active");
    const [myListActive, setMyListActive] = useState("");

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
                        link="/home"
                        Icon={BsLightning}
                    />

                    <SideBarOption
                        option="Hashtags"
                        Icon={FiHash}
                        looks={"looks"}
                    />
                    <li>
                        <hr className="my-2" />
                    </li>
                    <li>
                        <div className="hashtags">
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># dogs</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># funny</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># vibing</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># chilling</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># Soapbox</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># Vero</small>
                            {/* <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># hoots</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># moon</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># trends</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end"># XMG</small> */}
                        </div>
                    </li>

                    <SideBarOption
                        option="Stocks"
                        Icon={BiDollar}
                        looks={"looks"}
                    />
                    <li>
                        <hr className="my-2" />
                    </li>
                    <li>
                        <div className="hashtags">
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end">$ TWTR</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end">$ AAPL</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end">$ SPBX</small>
                            <small class="badge-hashtag outline-badge-hashtags d-flex flex-end">$ TSLA</small>
                            {/*<small class="badge-hashtag outline-badge-hashtags d-flex flex-end">$ AMZN</small> */}
                        </div>
                    </li>
                    <SideBarOption
                        option="Private Messages"
                        Icon={BiMessageDetail}
                    />
                    <SideBarOption
                        option="XMG Wallet"
                        Icon={BiWallet}
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
                            <a href="https://www.megahoot.com/" target="_blank" rel="nofollow">
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
