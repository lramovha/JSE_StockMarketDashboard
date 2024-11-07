// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Ticker from '../components/Ticker';
import StockTable from '../components/StockTable';
import { getStockData } from '../api';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const symbols = ["AAPL", "NFLX", "GOOGL", "AMZN"]; // Example symbols

  useEffect(() => {
    async function fetchStockList() {
      setLoading(true);
      setError(null);
      try {
        const data = await Promise.all(symbols.map(symbol => getStockData(symbol)));
        setStocks(data);
      } catch (err) {
        setError("Failed to load stock data");
      }
      setLoading(false);
    }
    fetchStockList();
  }, []);

  return (
    <div className="Dashboard">
      <Ticker stocks={stocks} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <StockTable stocks={stocks} />
      )}
    </div>
  );
}

export default Dashboard;
