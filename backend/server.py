from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="QuzeeDrive API")
api_router = APIRouter(prefix="/api")


# ------------------------- Models -------------------------
class Car(BaseModel):
    name: str
    image: Optional[str] = None
    category: Optional[str] = "Unknown"
    transmission: Optional[str] = "Manual"
    fuel: Optional[str] = "Petrol"
    seats: Optional[int] = 5
    pricePerDay: Optional[int] = 0


class CarCreate(BaseModel):
    name: str
    category: str
    transmission: str
    fuel: str
    seats: int
    pricePerDay: int
    image: str
    tag: Optional[str] = ""


class BookingCreate(BaseModel):
    name: str
    phone: str
    start_date: str
    end_date: str
    car_id: Optional[str] = None
    car_name: Optional[str] = None


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    booking_code: str
    name: str
    phone: str
    start_date: str
    end_date: str
    car_id: Optional[str] = None
    car_name: Optional[str] = None
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class HostCreate(BaseModel):
    name: str
    phone: str
    city: Optional[str] = "Chennai"
    car_model: Optional[str] = ""


class Host(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    city: str = "Chennai"
    car_model: str = ""
    status: str = "received"
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ------------------------- Seed data -------------------------

SEED_CARS = [
    {"name": "Tata Tiago xt", "category": "2025 modal", "transmission": "Manual", "fuel": "Petrol", "seats": 5, "pricePerDay": 2500, "tag": "Popular",
     "image": "https://i.postimg.cc/3NNbFkJL/Whats-App-Image-2026-07-02-at-5-42-34-PM.jpg"},
    {"name": "Toyota taisor", "category": "2025 modal",  "fuel": "Petrol with CnG", "seats": 5, "pricePerDay": 2600, "tag": "New",
     "image": "https://i.postimg.cc/MGkHkBCq/Whats-App-Image-2026-07-04-at-2-25-14-PM.jpg"},
    {"name": "Honda City", "category": "2021 modal",  "fuel": "Petrol", "seats": 5, "pricePerDay": 2800, "tag": "Premium",
     "image": "https://i.postimg.cc/2jxZ40P4/Whats-App-Image-2026-07-04-at-2-24-32-PM.jpg"},
    {"name": "Baleno", "category": "2025 modal",  "fuel": "petrol and CNG", "seats": 5, "pricePerDay": 2800, "tag": "",
     "image": "https://i.postimg.cc/nrxqn5NJ/Whats-App-Image-2026-07-04-at-2-23-56-PM.jpg"},
    {"name": "Baleno", "category": "2020 modal", "transmission": "Automatic", "fuel": "petrol", "seats": 5, "pricePerDay": 2300, "tag": "Popular",
     "image": "https://i.postimg.cc/8PhnBgTL/Whats-App-Image-2026-07-02-at-5-45-10-PM.jpg"},
]


def _gen_booking_code() -> str:
    digits = "".join(secrets.choice("0123456789") for _ in range(4))
    return f"QZ-{datetime.utcnow().year}-{digits}"


# ------------------------- Routes -------------------------

@api_router.get("/")
async def root():
    return {"message": "Drive API is live"}


@api_router.get("/cars", response_model=List[Car])
async def list_cars(category: Optional[str] = None):
    query = {}
    if category and category.lower() != "all":
        query["category"] = category
    docs = await db.cars.find(query, {"_id": 0}).to_list(200)
    return [Car(**d) for d in docs]


@api_router.get("/cars/{car_id}", response_model=Car)
async def get_car(car_id: str):
    doc = await db.cars.find_one({"id": car_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Car not found")
    return Car(**doc)


@api_router.post("/cars", response_model=Car)
async def create_car(payload: CarCreate):
    car = Car(**payload.dict())
    await db.cars.insert_one(car.dict())
    return car


@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    if not payload.name or not payload.phone:
        raise HTTPException(status_code=400, detail="Name and phone are required")

    car_name = payload.car_name
    if payload.car_id:
        car_doc = await db.cars.find_one({"id": payload.car_id}, {"_id": 0})
        if car_doc:
            car_name = car_doc["name"]

    booking = Booking(
        booking_code=_gen_booking_code(),
        name=payload.name,
        phone=payload.phone,
        start_date=payload.start_date,
        end_date=payload.end_date,
        car_id=payload.car_id,
        car_name=car_name,
    )
    await db.bookings.insert_one(booking.dict())
    return booking


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings():
    docs = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [Booking(**d) for d in docs]


@api_router.get("/bookings/track/{booking_code}")
async def track_booking(booking_code: str):
    doc = await db.bookings.find_one({"booking_code": booking_code.upper()}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Booking not found")

    steps = [
        {"title": "Booking Confirmed", "time": "10:24 AM", "ok": True},
        {"title": "Car Dispatched", "time": "11:05 AM", "ok": True},
        {"title": "En Route to Pickup Location", "time": "11:30 AM", "ok": True},
        {"title": "Awaiting Handover", "time": "Expected 12:00 PM", "ok": False},
    ]
    return {
        "booking_code": doc["booking_code"],
        "name": doc.get("name"),
        "car_name": doc.get("car_name"),
        "status": doc.get("status", "confirmed"),
        "steps": steps,
    }


@api_router.post("/hosts", response_model=Host)
async def create_host(payload: HostCreate):
    if not payload.name or not payload.phone:
        raise HTTPException(status_code=400, detail="Name and phone are required")
    host = Host(**payload.dict())
    await db.hosts.insert_one(host.dict())
    return host


@api_router.get("/hosts", response_model=List[Host])
async def list_hosts():
    docs = await db.hosts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [Host(**d) for d in docs]


# ------------------------- Startup -------------------------

@app.on_event("startup")
async def seed_cars():
    try:
        # இங்கே இந்த ஒரு வரியைச் சேர்க்கவும்
        logger.info("Connecting to MongoDB and seeding data...") 
        
        count = await db.cars.count_documents({})
        if count == 0:
            docs = [Car(**c).dict() for c in SEED_CARS]
            await db.cars.insert_many(docs)
            logger.info("Seeded %d cars", len(docs))
        else:
            logger.info("Database already seeded with %d cars", count)
            
    except Exception as e:
        logger.exception("Failed to seed cars: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=False)
