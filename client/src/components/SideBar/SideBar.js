import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiHash, FiBookmark, FiMoreHorizontal } from 'react-icons/fi'
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
                <SideBarOption option="Hashtags" Icon={FiHash} />
                <SideBarOption option="Stocks" Icon={BiDollar} />
                <SideBarOption option="Notifications" Icon={BiBell} />
                <SideBarOption option="Messages" Icon={BiMessageDetail} />
                <SideBarOption option="Bookmarks" Icon={FiBookmark} />
                <SideBarOption option="Lists" Icon={BiListUl} />
                <SideBarOption option="Profile" link={`/profile/${username}`} Icon={BiUser} />
                <SideBarOption option="More" Icon={FiMoreHorizontal} />

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
