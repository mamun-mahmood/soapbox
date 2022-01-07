import React, { useState } from 'react'
import FORTIS_LOGO from '../../assets/fortisFavicon.png';
import { IoPersonCircleOutline } from "react-icons/io5";
import ClickAwayListener from 'react-click-away-listener';
import { toast } from 'react-toastify';

const MarketplcaeNavBar = ({ fortisUserInfo, setSignedIn, setOpenCreateProduct }) => {
    const [openProfile, setOpenProfile] = useState(false);

    const marketplaceSignOut = () => {
        setSignedIn(false);
        localStorage.removeItem("Marketplace");
        toast.success("Signed Out successful!");
    }

    return (
        <div className="m-nav-pclub">
            <span className="m-brand" onClick={() => { setOpenCreateProduct(false) }}>
                <img src={FORTIS_LOGO} alt="Fortis logo" width="30" height="30" />
                FortisAB Marketplace
            </span>

            <div className="m-userInfo">
                {fortisUserInfo.isSeller && <button className="m-cap" onClick={() => { setOpenCreateProduct(true) }}>Create a product</button>}
                <IoPersonCircleOutline
                    className="m-profile"
                    onClick={() => { setOpenProfile(!openProfile) }}
                    style={{
                        border: openProfile ? "3px solid" : "none",
                        borderRadius: "50%"
                    }}
                />
                {openProfile &&
                    <ClickAwayListener onClickAway={() => { setOpenProfile(false) }}>
                        <div className="m-profile-details">
                            <span className="m-sign-out">{fortisUserInfo.name}</span>
                            <span className="m-sign-out" onClick={marketplaceSignOut}>Sign Out</span>
                        </div>
                    </ClickAwayListener>
                }
            </div>
        </div>
    )
}

export default MarketplcaeNavBar
