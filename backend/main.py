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
    await init_db()

@app.get("/")
async def root():
    return {"message": "Dell Laptop Advisor API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 