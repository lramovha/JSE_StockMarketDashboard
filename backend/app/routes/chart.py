# chart.py
from fastapi import APIRouter, HTTPException
from app.models.asset import ChartData
from app.services.data_fetcher import fetch_chart_data

router = APIRouter()

@router.get("/", response_model=list[ChartData])
async def get_chart_data(symbol: str, interval: str = "5min"):
    data = fetch_chart_data(symbol, interval)
    if not data:
        raise HTTPException(status_code=404, detail="No chart data found for the specified symbol and interval")
    return data
