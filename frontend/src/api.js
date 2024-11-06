// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getStockData = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};
