from typing import List, Optional
from app.models.asset import Asset

# Sample in-memory data to simulate a database
ASSETS = [
    Asset(symbol="AAPL", name="Apple Inc.", price=150.25, change=1.25),
    Asset(symbol="GOOGL", name="Alphabet Inc.", price=2800.15, change=-15.5),
    Asset(symbol="AMZN", name="Amazon.com, Inc.", price=3400.55, change=10.25),
    # Add more assets as needed
]

def get_all_assets() -> List[Asset]:
    """Fetch all assets."""
    return ASSETS

def get_asset_by_symbol(symbol: str) -> Optional[Asset]:
    """Fetch an asset by its symbol."""
    for asset in ASSETS:
        if asset.symbol == symbol:
            return asset
    return None
