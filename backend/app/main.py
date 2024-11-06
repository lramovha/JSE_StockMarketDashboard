# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup to allow React frontend to access FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stock/{symbol}")
async def get_stock_data(symbol: str):
    # Sample data; replace with actual logic
    return {"symbol": symbol, "price": 427.5, "PE": 40.99, "EPS": 8.57, "ROIC": 12.69}
