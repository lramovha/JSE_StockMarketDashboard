import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { fetchAssetsByCategory, fetchChartData } from './api/api';
import CategorySelector from './components/CategorySelector';
import AssetList from './components/AssetList';
import AssetDetail from './components/AssetDetail';

function App() {
    const [category, setCategory] = useState("Stocks");
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [chartData, setChartData] = useState([]);

    // Fetch assets whenever the category changes
    useEffect(() => {
        const loadAssets = async () => {
            const data = await fetchAssetsByCategory(category);
            setAssets(data);
            setSelectedAsset(null);
            setChartData([]);
        };
        loadAssets();
    }, [category]);

    // Fetch chart data whenever the selected asset changes
    useEffect(() => {
        if (selectedAsset) {
            const loadChartData = async () => {
                const data = await fetchChartData(selectedAsset.symbol);
                setChartData(data);
            };
            loadChartData();
        }
    }, [selectedAsset]);

    return (
        <div className="App">
            <h1>Market Summary</h1>
            <CategorySelector selectedCategory={category} onCategoryChange={setCategory} />
            <AssetList assets={assets} onAssetClick={setSelectedAsset} />
            {selectedAsset && <AssetDetail asset={selectedAsset} chartData={chartData} />}
        </div>
    );
}

export default App;

