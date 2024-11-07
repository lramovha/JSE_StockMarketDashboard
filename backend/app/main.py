# backend/app/main.py
import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Alpha Vantage API key
ALPHA_VANTAGE_API_KEY = "P0TKNIGW4BLQW764"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stock/{symbol}")
async def get_stock_data(symbol: str):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}"
    response = requests.get(url)
    data = response.json()
    quote = data.get("Global Quote", {})

    return {
        "symbol": symbol,
        "price": float(quote.get("05. price", 0)),
        "change": float(quote.get("09. change", 0)),
        "percentChange": float(quote.get("10. change percent", "0%").strip('%')),
        "volume": int(quote.get("06. volume", 0)),
        "high": float(quote.get("03. high", 0)),
        "low": float(quote.get("04. low", 0)),
        "marketCap": "N/A"  # Alpha Vantage doesn't provide market cap in free tier
    }

