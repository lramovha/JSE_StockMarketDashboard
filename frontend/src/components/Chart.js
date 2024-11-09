import React from 'react';
import { Line } from 'react-chartjs-2';

function Chart({ data }) {
    const chartData = {
        labels: data.map((point) => point.time),
        datasets: [
            {
                label: "Price",
                data: data.map((point) => point.close),
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                fill: true,
            },
        ],
    };

    const options = {
        scales: {
            x: { display: true, title: { display: true, text: "Time" } },
            y: { display: true, title: { display: true, text: "Price (USD)" } },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default Chart;
