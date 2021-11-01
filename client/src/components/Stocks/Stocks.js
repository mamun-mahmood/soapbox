import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import StockItem from './StockItem'
import './stocks.css'

const Stocks = () => {
    const [stocks, setStocks] = useState([]);
    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // getting user data
        const getStocksData = async () => {
            await axios.get(`${BaseURL}/stocks`)
                .then((response) => {
                    setStocks(response.data);
                });
        }
        getStocksData();
    }, [])

    return (
        <div className="stock-main">
            <div className="stock-head">
                Trending stocks
            </div>
            <div className="stocks-page">
                {stocks.map((stock) => {
                    return (<div className="stock-hover" key={stock.id}>
                        <Link to={`/stocks/${(stock.stock).replace('$', '')}`} style={{ textDecoration: "none" }}>
                            <StockItem stock={stock.stock} />
                        </Link>
                    </div>
                    )
                })}
            </div>
            <Helmet>
                <title>Trending Stocks on MegaHoot Soapbox : A Club Community Where Content Creators Become Club Owners, Earn and Build.</title>
            </Helmet>
        </div>
    )
}

export default Stocks
