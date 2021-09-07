import React from 'react'
import './stocks.css'

const StockItem = ({ stock }) => {
    return (
        <div className="stock-name">
            {stock}
        </div>
    )
}

export default StockItem
