from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import laptop_routes
from app.database import init_db
import uvicorn

app = FastAPI(
    title="Dell Laptop Advisor API",
    description="AI-powered Dell laptop recommendation system",
    version="1.0.0"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001", 
        "http://127.0.0.1:3001",
        "https://dell-laptop-advisor.vercel.app",  # Your Vercel domain
        "https://your-custom-domain.vercel.app"    # If you have custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(laptop_routes.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    try:
        await init_db()
        print("🚀 Dell Laptop Advisor API started successfully!")
    except Exception as e:
        print(f"❌ Failed to initialize application: {e}")
        raise e

@app.get("/")
async def root():
    return {
        "message": "Dell Laptop Advisor API is running!",
        "status": "healthy",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    try:
        from app.database import get_db
        db = get_db()
        # Test database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": "2025-01-27T00:00:00Z"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "timestamp": "2025-01-27T00:00:00Z"
        }

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False) 