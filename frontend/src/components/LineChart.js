// frontend/src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ stockData }) {
  if (!stockData) return null;

  const data = {
    labels: stockData.dates, // Array of date strings
    datasets: [
      {
        label: `${stockData.symbol} Price`,
        data: stockData.prices, // Array of price values
        borderColor: '#00b4d8',
        backgroundColor: 'rgba(0, 180, 216, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
