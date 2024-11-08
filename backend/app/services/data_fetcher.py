# data_fetcher.py
import requests
from app.config import ALPHA_VANTAGE_API_KEY, BASE_URL

def fetch_assets_by_category(category):
    # Placeholder for fetching top assets by category
    # You can define specific symbols for each category and fetch their latest data
    symbols = {
        "Stocks": ["AAPL", "GOOGL", "MSFT"],
        "Crypto": ["BTC", "ETH", "ADA"],
        # Add more categories and symbols as needed
    }
    
    data = []
    for symbol in symbols.get(category, []):
        response = requests.get(f"{BASE_URL}?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}")
        if response.status_code == 200:
            json_data = response.json().get("Global Quote")
            if json_data:
                asset = {
                    "symbol": symbol,
                    "name": symbol,  # Placeholder, use actual names if available
                    "price": float(json_data["05. price"]),
                    "change": float(json_data["10. change percent"].replace("%", ""))
                }
                data.append(asset)
    return data

def fetch_chart_data(symbol, interval):
    response = requests.get(f"{BASE_URL}?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval={interval}&apikey={ALPHA_VANTAGE_API_KEY}")
    if response.status_code == 200:
        time_series_key = f"Time Series ({interval})"
        json_data = response.json().get(time_series_key, {})
        chart_data = [
            {
                "time": time,
                "open": float(data["1. open"]),
                "high": float(data["2. high"]),
                "low": float(data["3. low"]),
                "close": float(data["4. close"]),
                "volume": int(data["5. volume"])
            }
            for time, data in json_data.items()
        ]
        return chart_data
    return []
