import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import DIgitalArt from './Carousel/DigitalArt';
import LiveAuctionsCarousel from './Carousel/LiveAuctionsCarousel';
import MarketplaceCarousel from './Carousel/MarketplaceCarousel';
import SoapBoxClubs from './Carousel/SoapBoxClubs';
import MarketplcaeNavBar from './MarketplcaeNavBar';
import NewLoadingBox from './NewLoadingBox';
import SearchResults from './SearchResults';

const MarketplaceProducts = ({
    setSignedIn,
    fortisUserInfo,
    setOpenCreateProduct
}) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [finalSearchTerm, setFinalSearchTerm] = useState("");
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
        <Fragment>
            <div className="m-width-fix">
                {loading
                    ? <NewLoadingBox />
                    : products.length !== 0 &&
                    <div>
                        <MarketplcaeNavBar
                            fortisUserInfo={fortisUserInfo}
                            setSignedIn={setSignedIn}
                            setOpenCreateProduct={setOpenCreateProduct}
                            setSearchTerm={setSearchTerm}
                            setFinalSearchTerm={setFinalSearchTerm}
                        />
                        <LiveAuctionsCarousel products={products} />
                        <MarketplaceCarousel products={products} />
                        <DIgitalArt products={products} />
                        <SoapBoxClubs products={products} />
                    </div>
                }
            </div>
            {/* {finalSearchTerm.length > 3
                ? <div>
                    <MarketplcaeNavBar
                        fortisUserInfo={fortisUserInfo}
                        setSignedIn={setSignedIn}
                        setOpenCreateProduct={setOpenCreateProduct}
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                    />
                    <SearchResults
                        setFinalSearchTerm={setFinalSearchTerm}
                    />
                </div>
                : <div className="m-width-fix">
                    {loading
                        ? <NewLoadingBox />
                        : products.length !== 0 &&
                        <div>
                            <MarketplcaeNavBar
                                fortisUserInfo={fortisUserInfo}
                                setSignedIn={setSignedIn}
                                setOpenCreateProduct={setOpenCreateProduct}
                                setSearchTerm={setSearchTerm}
                                setFinalSearchTerm={setFinalSearchTerm}
                            />
                            <LiveAuctionsCarousel products={products} />
                            <MarketplaceCarousel products={products} />
                            <DIgitalArt products={products} />
                            <SoapBoxClubs products={products} />
                        </div>
                    }
                </div>
            } */}
        </Fragment>
    )
}

export default MarketplaceProducts
