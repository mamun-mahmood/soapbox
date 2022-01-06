import React from 'react'

const MarketplcaeNavBar = ({ fortisUserInfo, setSignedIn }) => {
    return (
        <div className="m-nav-pclub">
            <span style={{ fontSize: "1.2rem" }}>Fortis Marketplace</span>
            <div className="m-userInfo">
                <span className="m-sign-out">{fortisUserInfo.name}</span>
                <span className="m-sign-out" onClick={() => { setSignedIn(false) }}>Sign Out</span>
            </div>
        </div>
    )
}

export default MarketplcaeNavBar
