// api.js
const BASE_URL = "http://127.0.0.1:8000/api";  // Updated to match the backend URL

export const fetchAssetsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/assets?category=${category}`);
    const data = await response.json();

    console.log('Fetched assets:', data);  // Check what the data looks like

    return Array.isArray(data) ? data : [];  // Ensure it’s an array
};


export const fetchChartData = async (symbol, interval = "5min") => {
    const response = await fetch(`${BASE_URL}/chart?symbol=${symbol}&interval=${interval}`);
    return response.json();
};
