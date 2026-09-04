from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from forecasting import forecasting_engine
import datetime

app = FastAPI(
    title="Street Vendor Digital Twin API",
    description="AI-driven inventory intelligence & demand forecasting for informal economy micro-merchants.",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory realistic initial inventory catalog
DEFAULT_INVENTORY = [
    {"id": 1, "name": "Tomatoes (टमाटर)", "category": "Vegetables", "current_stock_kg": 18.0, "base_daily_kg": 35.0, "perishability": 4, "cost_per_kg": 30, "price_per_kg": 45},
    {"id": 2, "name": "Potatoes (आलू)", "category": "Vegetables", "current_stock_kg": 45.0, "base_daily_kg": 50.0, "perishability": 1, "cost_per_kg": 18, "price_per_kg": 28},
    {"id": 3, "name": "Onions (प्याज़)", "category": "Vegetables", "current_stock_kg": 30.0, "base_daily_kg": 40.0, "perishability": 2, "cost_per_kg": 25, "price_per_kg": 35},
    {"id": 4, "name": "Bananas (केले)", "category": "Fruits", "current_stock_kg": 12.0, "base_daily_kg": 25.0, "perishability": 5, "cost_per_kg": 35, "price_per_kg": 50},
    {"id": 5, "name": "Coriander / Mirchi (धनिया-मिर्च)", "category": "Herbs", "current_stock_kg": 4.0, "base_daily_kg": 8.0, "perishability": 5, "cost_per_kg": 40, "price_per_kg": 80}
]

# In-memory sales log
sales_records = [
    {"id": 101, "item": "Tomatoes (टमाटर)", "qty_kg": 2.5, "total_inr": 112.5, "payment_mode": "UPI", "time": "09:30 AM"},
    {"id": 102, "item": "Potatoes (आलू)", "qty_kg": 5.0, "total_inr": 140.0, "payment_mode": "Cash", "time": "10:15 AM"},
]

class ForecastRequest(BaseModel):
    temperature: float = 32.0
    is_raining: bool = False
    festival_multiplier: float = 1.0

class SaleLogRequest(BaseModel):
    raw_text: Optional[str] = None
    item_name: str
    qty_kg: float
    price_per_kg: float
    payment_mode: str = "UPI"

@app.get("/api/health")
def health_check():
    return {"status": "active", "timestamp": datetime.datetime.now().isoformat()}

@app.get("/api/inventory")
def get_inventory():
    return {"items": DEFAULT_INVENTORY}

@app.post("/api/forecast/daily")
def get_daily_forecast(params: ForecastRequest):
    predictions = []
    total_est_revenue = 0.0
    total_est_procure_cost = 0.0

    for item in DEFAULT_INVENTORY:
        pred = forecasting_engine.predict_demand(
            item_name=item["name"],
            base_demand=item["base_daily_kg"],
            perishability=item["perishability"],
            temp=params.temperature,
            is_raining=params.is_raining,
            festival_factor=params.festival_multiplier
        )
        
        needed_procure = max(0.0, round(pred["recommended_procure_kg"] - item["current_stock_kg"], 1))
        est_revenue = round(pred["predicted_sales_kg"] * item["price_per_kg"], 2)
        est_procure_cost = round(needed_procure * item["cost_per_kg"], 2)

        total_est_revenue += est_revenue
        total_est_procure_cost += est_procure_cost

        predictions.append({
            **pred,
            "current_stock_kg": item["current_stock_kg"],
            "procure_advice_kg": needed_procure,
            "est_revenue_inr": est_revenue,
            "est_cost_inr": est_procure_cost,
            "price_per_kg": item["price_per_kg"]
        })

    return {
        "weather_summary": {
            "temp_c": params.temperature,
            "is_raining": params.is_raining,
            "festival_multiplier": params.festival_multiplier
        },
        "forecast_items": predictions,
        "summary": {
            "expected_daily_revenue_inr": round(total_est_revenue, 2),
            "expected_procurement_cost_inr": round(total_est_procure_cost, 2),
            "projected_gross_profit_inr": round(total_est_revenue - total_est_procure_cost, 2),
            "prevented_waste_est_kg": 6.8
        }
    }

@app.post("/api/sales/log")
def log_sale(sale: SaleLogRequest):
    total = round(sale.qty_kg * sale.price_per_kg, 2)
    record = {
        "id": len(sales_records) + 101,
        "item": sale.item_name,
        "qty_kg": sale.qty_kg,
        "total_inr": total,
        "payment_mode": sale.payment_mode,
        "time": datetime.datetime.now().strftime("%I:%M %p")
    }
    sales_records.insert(0, record)
    return {"message": "Sale logged successfully", "record": record}

@app.get("/api/sales/history")
def get_sales_history():
    total_sales_val = sum(r["total_inr"] for r in sales_records)
    return {
        "sales": sales_records,
        "total_revenue_today_inr": round(total_sales_val, 2),
        "total_orders_count": len(sales_records)
    }