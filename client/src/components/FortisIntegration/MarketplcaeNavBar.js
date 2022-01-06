import React, { useState } from 'react'
import FORTIS_LOGO from '../../assets/fortisFavicon.png';
import { IoPersonCircleOutline } from "react-icons/io5";

const MarketplcaeNavBar = ({ fortisUserInfo, setSignedIn }) => {
    const [openProfile, setOpenProfile] = useState(false);

    const marketplaceSignOut = () => {
        setSignedIn(false);
        localStorage.removeItem("Marketplace")
    }

    return (
        <div className="m-nav-pclub">
            <span className="m-brand">
                <img src={FORTIS_LOGO} alt="Fortis logo" width="30" height="30" />
                Fortis Marketplace
            </span>
            <div className="m-userInfo">
                {fortisUserInfo.isSeller && <button className="m-cap">Create a product</button>}
                <IoPersonCircleOutline className="m-profile" onClick={() => { setOpenProfile(!openProfile) }} />
                {openProfile &&
                    <div className="m-profile-details">
                        <span className="m-sign-out">{fortisUserInfo.name}</span>
                        <span className="m-sign-out" onClick={marketplaceSignOut}>Sign Out</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default MarketplcaeNavBar
