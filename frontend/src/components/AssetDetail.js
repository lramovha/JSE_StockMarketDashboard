import React from 'react';
import Chart from './Chart';

function AssetDetail({ asset, chartData }) {
    return (
        <div className="asset-detail">
            <h2>{asset.name} - {asset.symbol}</h2>
            <p>Price: ${asset.price}</p>
            <p>Change: {asset.change}%</p>
            <Chart data={chartData} />
        </div>
    );
}

export default AssetDetail;
