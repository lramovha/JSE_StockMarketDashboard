# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import assets, chart

app = FastAPI()

# Allow CORS from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the routers
app.include_router(assets.router, prefix="/api/assets", tags=["Assets"])
app.include_router(chart.router, prefix="/api/chart", tags=["Chart"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Stock Market Dashboard API"}
