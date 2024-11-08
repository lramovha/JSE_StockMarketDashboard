// api.js
const BASE_URL = "http://127.0.0.1:8000/api";  // Make sure this matches your backend URL

export const fetchAssetsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/assets?category=${category}`);
    return response.json();
};

export const fetchChartData = async (symbol, interval = "5min") => {
    const response = await fetch(`${BASE_URL}/chart?symbol=${symbol}&interval=${interval}`);
    return response.json();
};
