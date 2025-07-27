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
    mongodb_uri = os.getenv("MONGODB_URI")
    
    if not mongodb_uri:
        print("❌ MONGODB_URI environment variable not found!")
        print("Please set MONGODB_URI in your environment variables")
        raise ValueError("MONGODB_URI environment variable is required")
    
    print(f"🔗 Attempting to connect to MongoDB...")
    print(f"📡 URI: {mongodb_uri[:50]}...")  # Show first 50 chars for debugging
    
    try:
        client = AsyncIOMotorClient(mongodb_uri)
        # Test the connection
        await client.admin.command('ping')
        db = client.dell_laptop_advisor
        print("✅ Connected to MongoDB successfully!")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise e

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
        try:
            # Try relative path first (for local development)
            with open("../data.json", "r", encoding="utf-8") as f:
                laptops_data = json.load(f)
        except FileNotFoundError:
            # Try absolute path (for production deployment)
            import os
            current_dir = os.path.dirname(os.path.abspath(__file__))
            data_path = os.path.join(current_dir, "..", "..", "data.json")
            with open(data_path, "r", encoding="utf-8") as f:
                laptops_data = json.load(f)
        
        # Insert laptops into database
        await db.laptops.insert_many(laptops_data)
        print(f"✅ Inserted {len(laptops_data)} laptops into database")
    else:
        print(f"✅ Database already contains {laptops_count} laptops")

def get_db():
    return db 