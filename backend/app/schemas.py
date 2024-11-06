# backend/app/schemas.py
from pydantic import BaseModel

class StockData(BaseModel):
    price: float
    pe_ratio: float
    eps: float
    roic: float
    free_cash_flow: list[float]
    return_on_equity: list[float]
    buy_consensus: dict[str, int]
