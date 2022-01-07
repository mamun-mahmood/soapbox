import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DIgitalArt from './Carousel/DigitalArt';
import LiveAuctionsCarousel from './Carousel/LiveAuctionsCarousel';
import MarketplaceCarousel from './Carousel/MarketplaceCarousel';
import SoapBoxClubs from './Carousel/SoapBoxClubs';
import MarketplcaeNavBar from './MarketplcaeNavBar';
import NewLoadingBox from './NewLoadingBox';

const MarketplaceProducts = ({ fortisUserInfo, setSignedIn, setOpenCreateProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            await axios.get(`https://fortisab.com/api/products?seller=`)
                .then((response) => {
                    if (response.data) {
                        setLoading(false);
                        setProducts(response.data);
                    }
                })
        }

        fetchProducts();
    }, [])

    return (
        <div className="m-width-fix">
            {loading
                ? <NewLoadingBox />
                : products.length !== 0 &&
                <div>
                    <MarketplcaeNavBar fortisUserInfo={fortisUserInfo} setSignedIn={setSignedIn} setOpenCreateProduct={setOpenCreateProduct} />
                    <LiveAuctionsCarousel products={products} />
                    <MarketplaceCarousel products={products} />
                    <DIgitalArt products={products} />
                    <SoapBoxClubs products={products} />
                </div>
            }
        </div>
    )
}

export default MarketplaceProducts
