import React from 'react'
import { Link } from 'react-router-dom'
import { RiCompassDiscoverLine } from 'react-icons/ri'
import { FiHome, FiHash, FiBookmark, FiMoreHorizontal, FiAward } from 'react-icons/fi'
import { BiMessageDetail, BiBell, BiUser, BiListUl, BiDollar } from 'react-icons/bi'
import SideBarOption from './SideBarOption'
import './sidebar.css';

const SideBar = () => {
    var username = "";
    const userInfo = JSON.parse(localStorage.getItem("loggedIn"));
    if (userInfo) {
        username = userInfo.username;
    }

    return (
        <div className="sidebar">
            <ui>
                <SideBarOption option="Home" link="/home" Icon={FiHome} />
                <SideBarOption option="Discover" link="/home" Icon={RiCompassDiscoverLine} />
                <SideBarOption option="Hashtags" Icon={FiHash} />
                <SideBarOption option="Stocks" Icon={BiDollar} />
                <SideBarOption option="Notifications" Icon={BiBell} />
                <SideBarOption option="Favorites" Icon={FiAward} />
                {/* <SideBarOption option="Bookmarks" Icon={FiBookmark} /> */}
                <SideBarOption option="Messages" Icon={BiMessageDetail} />
                <SideBarOption option="Profile" link={`/profile/${username}`} Icon={BiUser} />
                {/* <SideBarOption option="Lists" Icon={BiListUl} /> */}
                {/* <SideBarOption option="More" Icon={FiMoreHorizontal} /> */}

                <div className="btn-hoot">
                    <Link to="/create">
                        Hoot
                    </Link>
                </div>

                <div className="btn-XMG">
                    <Link>
                        Connect XMG Wallet
                    </Link>
                </div>

            </ui>
        </div>
    )
}

export default SideBar
