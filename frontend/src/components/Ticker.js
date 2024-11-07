// frontend/src/components/Ticker.js
import React from 'react';
import './Ticker.css';

function Ticker({ stocks, setSelectedStock }) {
  return (
    <div className="Ticker">
      {stocks.map(stock => (
        <div
          key={stock.symbol}
          className="Ticker-item"
          onClick={() => setSelectedStock(stock.symbol)}
        >
          {stock.symbol}: ${stock.price} ({stock.percentChange}%)
        </div>
      ))}
    </div>
  );
}

export default Ticker;
