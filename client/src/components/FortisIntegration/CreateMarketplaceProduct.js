import React from 'react'
import ProductEditScreen from './Carousel/ProductEditScreen'
import MarketplcaeNavBar from './MarketplcaeNavBar'

const CreateMarketplaceProduct = ({ fortisUserInfo, setSignedIn, setOpenCreateProduct }) => {
    return (
        <div>
            <MarketplcaeNavBar fortisUserInfo={fortisUserInfo} setSignedIn={setSignedIn} setOpenCreateProduct={setOpenCreateProduct} />
            <ProductEditScreen fortisUserInfo={fortisUserInfo} setOpenCreateProduct={setOpenCreateProduct} />
        </div>
    )
}

export default CreateMarketplaceProduct
