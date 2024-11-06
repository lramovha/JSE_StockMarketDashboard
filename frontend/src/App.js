// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { getStockData } from './api';

function App() {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getStockData("NFLX");
      setStockData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Stock Market Dashboard</h1>
      {stockData ? (
        <div>
          <h2>{stockData.symbol}</h2>
          <p>Price: ${stockData.price}</p>
          <p>PE Ratio: {stockData.PE}</p>
          <p>EPS: {stockData.EPS}</p>
          <p>ROIC: {stockData.ROIC}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

