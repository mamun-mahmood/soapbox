import React, { useState } from 'react'
import FortisSignIn from './FortisSignIn';
import MarketplaceProducts from './MarketplaceProducts';

const FortisMarketplaceArea = () => {
    const fortisUserInfo = JSON.parse(localStorage.getItem("Marketplace"));
    const [signedIn, setSignedIn] = useState(fortisUserInfo ? true : false);

    const handleChange = (value) => {
        setSignedIn(value);
    }

    return (
        <div >
            {signedIn
                ? <MarketplaceProducts fortisUserInfo={fortisUserInfo} setSignedIn={setSignedIn} />
                : <FortisSignIn handleChange={handleChange} setSignedIn={setSignedIn} />
            }
        </div>
    )
}

export default FortisMarketplaceArea
