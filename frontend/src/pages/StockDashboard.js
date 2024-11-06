// frontend/src/pages/StockDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchStockData } from '../api/stockApi';
import { BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function StockDashboard() {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetchStockData('NFLX').then(data => setStockData(data));
  }, []);

  if (!stockData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{`Price: $${stockData.price}`}</h1>
      <h2>{`PE Ratio: ${stockData.pe_ratio}`}</h2>
      <h2>{`EPS: ${stockData.eps}`}</h2>
      <h2>{`ROIC: ${stockData.roic}%`}</h2>

      {/* Free Cash Flow Chart */}
      <BarChart width={300} height={200} data={stockData.free_cash_flow.map((value, index) => ({ year: 2000 + index, value }))}>
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

      {/* Buy Consensus Pie Chart */}
      <PieChart width={200} height={200}>
        <Pie data={Object.entries(stockData.buy_consensus).map(([key, value]) => ({ name: key, value }))} dataKey="value" outerRadius={80}>
          <Cell fill="#0088FE" />
          <Cell fill="#00C49F" />
          <Cell fill="#FFBB28" />
          <Cell fill="#FF8042" />
          <Cell fill="#FF8042" />
        </Pie>
      </PieChart>
    </div>
  );
}

export default StockDashboard;
