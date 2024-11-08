# config.py
import os
from dotenv import load_dotenv

load_dotenv()

ALPHA_VANTAGE_API_KEY = os.getenv("DC2BW7CFKZHL4COF")
BASE_URL = "https://www.alphavantage.co/query"
