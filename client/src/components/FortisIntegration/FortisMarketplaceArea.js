import React, { useState } from 'react'
import CreateMarketplaceProduct from './CreateMarketplaceProduct';
import FortisSignIn from './FortisSignIn';
import MarketplaceProducts from './MarketplaceProducts';

const FortisMarketplaceArea = () => {
    const fortisUserInfo = JSON.parse(localStorage.getItem("Marketplace"));
    const [signedIn, setSignedIn] = useState(fortisUserInfo ? true : false);
    const [openCreateProduct, setOpenCreateProduct] = useState(false);

    const handleChange = (value) => {
        setSignedIn(value);
    }

    return (
        <div >
            {signedIn
                ? openCreateProduct
                    ? <CreateMarketplaceProduct fortisUserInfo={fortisUserInfo} setSignedIn={setSignedIn} setOpenCreateProduct={setOpenCreateProduct} />
                    : <MarketplaceProducts fortisUserInfo={fortisUserInfo} setSignedIn={setSignedIn} setOpenCreateProduct={setOpenCreateProduct} />
                : <FortisSignIn handleChange={handleChange} setSignedIn={setSignedIn} />
            }
        </div>
    )
}

export default FortisMarketplaceArea
