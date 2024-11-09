# assets.py
from fastapi import APIRouter, HTTPException
from app.models.asset import Asset
from app.services.data_fetcher import fetch_assets_by_category
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Asset])
async def get_assets(category: str):
    data = fetch_assets_by_category(category)
    if not data:
        raise HTTPException(status_code=404, detail="No assets found for the specified category")
    return data
