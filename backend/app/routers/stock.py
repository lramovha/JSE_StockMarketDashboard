# backend/app/routers/stock.py
from fastapi import APIRouter
from app.schemas import StockData

router = APIRouter()

@router.get("/stock/{symbol}", response_model=StockData)
async def get_stock_data(symbol: str):
    # Placeholder data; replace this with real data fetching logic.
    data = {
        "price": 427.5,
        "pe_ratio": 40.99,
        "eps": 8.57,
        "roic": 12.69,
        "free_cash_flow": [-3, -2.5, -1, 0.5, 1.5, 2],
        "return_on_equity": [-10, 0, 15, 25, 30, 10],
        "buy_consensus": {"strong_buy": 3, "buy": 13, "hold": 21, "sell": 1, "strong_sell": 2},
    }
    return data
