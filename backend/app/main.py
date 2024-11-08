# main.py
from fastapi import FastAPI
from app.routes import assets, chart

app = FastAPI()

# Include the routers
app.include_router(assets.router, prefix="/api/assets", tags=["Assets"])
app.include_router(chart.router, prefix="/api/chart", tags=["Chart"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Stock Market Dashboard API"}
