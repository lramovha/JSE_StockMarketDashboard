# backend/app/services.py
import httpx

API_BASE_URL = "https://www.alphavantage.co/query"
API_KEY = "P0TKNIGW4BLQW764"  # Replace with your API key

async def fetch_stock_data(symbol: str):
    params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "apikey": API_KEY
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(API_BASE_URL, params=params)
        response.raise_for_status()  # Raise error for non-200 responses
        data = response.json()
    
    # Extract relevant data
    try:
        time_series = data["Time Series (Daily)"]
        latest_date = next(iter(time_series))  # Get the most recent date
        latest_data = time_series[latest_date]

        return {
            "symbol": symbol,
            "price": float(latest_data["4. close"]),
            "PE": None,  # You'll need to extract PE from a different endpoint if available
            "EPS": None,  # Same as above
            "ROIC": None,  # Same as above
        }
    except KeyError:
        raise Exception(f"Could not fetch data for {symbol}")

