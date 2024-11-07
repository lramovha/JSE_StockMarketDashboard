// frontend/src/components/Ticker.js
import React from 'react';
import './Ticker.css';

function Ticker({ stocks }) {
  return (
    <div className="Ticker">
      {stocks.map(stock => (
        <div key={stock.symbol} className="Ticker-item">
          {stock.symbol}: ${stock.price} ({stock.change}%)
        </div>
      ))}
    </div>
  );
}

export default Ticker;
