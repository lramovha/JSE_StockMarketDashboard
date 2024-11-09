import React from 'react';

const AssetList = ({ assets, onAssetClick }) => {
    // Ensure assets is always an array
    const assetArray = Array.isArray(assets) ? assets : [];

    return (
        <div className="asset-list">
            {assetArray.map((asset) => (
                <div key={asset.symbol} className="asset-item" onClick={() => onAssetClick(asset)}>
                    <span>{asset.name}</span>
                    <span>{asset.price} USD</span>
                    <span className={asset.change >= 0 ? "positive" : "negative"}>
                        {asset.change >= 0 ? `+${asset.change}%` : `${asset.change}%`}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default AssetList;
