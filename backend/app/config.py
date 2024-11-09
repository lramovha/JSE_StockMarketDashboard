# config.py
import os
from dotenv import load_dotenv

load_dotenv()

ALPHA_VANTAGE_API_KEY = os.getenv("4YV55VSZFL14JU30")
BASE_URL = "https://www.alphavantage.co/query"
