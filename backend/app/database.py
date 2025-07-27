import os
import json
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
client = None
db = None

async def connect_to_mongo():
    global client, db
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    client = AsyncIOMotorClient(mongodb_uri)
    db = client.dell_laptop_advisor
    print("Connected to MongoDB!")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed!")

async def init_db():
    await connect_to_mongo()
    
    # Check if laptops collection is empty
    laptops_count = await db.laptops.count_documents({})
    
    if laptops_count == 0:
        # Load data from data.json
        with open("../data.json", "r", encoding="utf-8") as f:
            laptops_data = json.load(f)
        
        # Insert laptops into database
        await db.laptops.insert_many(laptops_data)
        print(f"Inserted {len(laptops_data)} laptops into database")

def get_db():
    return db 