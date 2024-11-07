// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Ticker from '../components/Ticker';
import StockTable from '../components/StockTable';
import StockDetailModal from '../components/StockDetailModal';
import { getStockData } from '../api';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const symbols = ["AAPL", "NFLX", "GOOGL", "AMZN", "MSFT", "TSLA", "NVDA", "META", "JPM", "V"];

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

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  return (
    <div className="Dashboard">
      <Ticker stocks={stocks} setSelectedStock={handleStockClick} />
      <div className="stock-buttons">
        {symbols.map(symbol => (
          <button
            key={symbol}
            className={selectedStock === symbol ? "active" : ""}
            onClick={() => setSelectedStock(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <StockTable stocks={stocks} onStockClick={handleStockClick} />
      )}
      <StockDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stockData={selectedStock}
      />
    </div>
  );
}

export default Dashboard;


