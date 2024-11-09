import requests
from app.config import ALPHA_VANTAGE_API_KEY, BASE_URL
import time

# Mapping symbols to category
symbols = {
    "Stocks": ["AAPL", "GOOGL", "MSFT"],
    "Crypto": ["BTC", "ETH", "ADA"],
    # Add more categories and symbols as needed
}

ASSET_NAMES = {
    "AAPL": "Apple Inc.",
    "GOOGL": "Alphabet Inc.",
    "MSFT": "Microsoft Corp.",
    # Add more names as needed
}

# Valid intervals for chart data
valid_intervals = ["1min", "5min", "15min", "30min", "60min", "daily", "weekly", "monthly"]

def fetch_assets_by_category(category):
    data = []
    for symbol in symbols.get(category, []):
        try:
            # Fetch global quote data for the symbol
            response = requests.get(f"{BASE_URL}?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}")
            
            # Log response for debugging
            print(f"Response for {symbol}: {response.json()}")

            if response.status_code == 200:
                json_data = response.json().get("Global Quote", {})
                if json_data:
                    price = json_data.get("05. price")
                    change_percent = json_data.get("10. change percent")

                    # Validate that price and change percent are available and in the expected format
                    if price and change_percent:
                        asset = {
                            "symbol": symbol,
                            "name": ASSET_NAMES.get(symbol, symbol),
                            "price": float(price),
                            "change": float(change_percent.replace("%", "")) if "%" in change_percent else 0
                        }
                        data.append(asset)
                    else:
                        print(f"Missing price or change for {symbol}: {json_data}")
                else:
                    print(f"No 'Global Quote' data found for {symbol}")
            elif response.status_code == 503:
                # Handle rate limiting (503 is a service unavailable response, indicating rate limit exceeded)
                print(f"Rate limit exceeded, retrying after 60 seconds for {symbol}...")
                time.sleep(60)
            else:
                print(f"Error fetching data for {symbol}: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Request failed for {symbol}: {e}")
            time.sleep(60)  # Wait before retrying if there's a request exception

    return data

def fetch_chart_data(symbol, interval):
    # Validate the interval is correct
    if interval not in valid_intervals:
        print(f"Invalid interval: {interval}")
        return []

    # Fetch intraday chart data for the symbol
    response = requests.get(f"{BASE_URL}?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval={interval}&apikey={ALPHA_VANTAGE_API_KEY}")
    
    # Log the response for debugging
    print(f"Response for {symbol} with interval {interval}: {response.json()}")
    
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
    elif response.status_code == 503:
        # Handle rate limiting
        print(f"Rate limit exceeded, retrying after 60 seconds for {symbol} and interval {interval}...")
        time.sleep(60)
        return fetch_chart_data(symbol, interval)  # Retry the request after waiting
    else:
        print(f"Error fetching chart data for {symbol} with interval {interval}: {response.status_code}")
        return []


