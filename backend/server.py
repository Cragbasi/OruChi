from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ Models ============

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    service_type: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class TestimonialCreate(BaseModel):
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    service_type: str

class GalleryItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    service_type: str
    before_image: str
    after_image: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class GalleryItemCreate(BaseModel):
    title: str
    description: str
    service_type: str
    before_image: str
    after_image: str

# ============ Routes ============

@api_router.get("/")
async def root():
    return {"message": "Chi's Fixerupper API"}

# Contact Messages
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    doc = contact_obj.model_dump()
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

# Testimonials
@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    testimonial_dict = input.model_dump()
    testimonial_obj = Testimonial(**testimonial_dict)
    doc = testimonial_obj.model_dump()
    await db.testimonials.insert_one(doc)
    return testimonial_obj

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
    return testimonials

# Gallery
@api_router.post("/gallery", response_model=GalleryItem)
async def create_gallery_item(input: GalleryItemCreate):
    gallery_dict = input.model_dump()
    gallery_obj = GalleryItem(**gallery_dict)
    doc = gallery_obj.model_dump()
    await db.gallery.insert_one(doc)
    return gallery_obj

@api_router.get("/gallery", response_model=List[GalleryItem])
async def get_gallery_items():
    gallery = await db.gallery.find({}, {"_id": 0}).to_list(1000)
    return gallery

# Seed data endpoint
@api_router.post("/seed")
async def seed_data():
    # Check if data already exists
    testimonials_count = await db.testimonials.count_documents({})
    gallery_count = await db.gallery.count_documents({})
    
    if testimonials_count == 0:
        sample_testimonials = [
            {
                "id": str(uuid.uuid4()),
                "name": "Sarah Johnson",
                "rating": 5,
                "comment": "Chi fixed our leaking roof in no time! Professional, affordable, and the quality is outstanding. Highly recommend!",
                "service_type": "Roof Repair",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Michael Chen",
                "rating": 5,
                "comment": "Our kitchen cabinets look brand new after Chi's work. He's meticulous and his prices are very fair.",
                "service_type": "Cabinets",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Emily Rodriguez",
                "rating": 5,
                "comment": "Best plumber in the neighborhood! Fixed our bathroom pipes and even gave us tips to prevent future issues.",
                "service_type": "Plumbing",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "David Thompson",
                "rating": 5,
                "comment": "Chi painted our entire house interior. The attention to detail is incredible. Worth every penny!",
                "service_type": "Painting",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.testimonials.insert_many(sample_testimonials)
    
    if gallery_count == 0:
        sample_gallery = [
            {
                "id": str(uuid.uuid4()),
                "title": "Kitchen Cabinet Refinishing",
                "description": "Complete cabinet refinishing with new hardware installation",
                "service_type": "Cabinets",
                "before_image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
                "after_image": "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Interior Wall Repair & Paint",
                "description": "Drywall repair and fresh coat of premium paint",
                "service_type": "Painting",
                "before_image": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800",
                "after_image": "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Bathroom Plumbing Overhaul",
                "description": "Complete pipe replacement and fixture installation",
                "service_type": "Plumbing",
                "before_image": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
                "after_image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Hardwood Floor Restoration",
                "description": "Sanding, staining, and finishing of hardwood floors",
                "service_type": "Flooring",
                "before_image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                "after_image": "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.gallery.insert_many(sample_gallery)
    
    return {"message": "Data seeded successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
