// frontend/src/components/StockTable.js
import React from 'react';
import './StockTable.css';

function StockTable({ stocks }) {
    return (
      <table className="StockTable">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>% Change</th>
            <th>PE Ratio</th>
            <th>Market Cap</th>
            <th>Volume</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>${stock.price}</td>
              <td>{stock.change}</td>
              <td>{stock.percentChange}%</td>
              <td>{stock.PE}</td>
              <td>{stock.marketCap}</td>
              <td>{stock.volume.toLocaleString()}</td>
              <td>${stock.high}</td>
              <td>${stock.low}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
  
export default StockTable;
