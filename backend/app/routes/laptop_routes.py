from fastapi import APIRouter, HTTPException
from app.models.laptop import RecommendationRequest, RecommendationResponse, MarketingRequest
from app.services.recommendation_service import get_recommendation, get_all_laptops
from app.services.gemini_service import generate_marketing_content

router = APIRouter()

@router.post("/recommend", response_model=RecommendationResponse)
async def recommend_laptop(request: RecommendationRequest):
    """Get laptop recommendation based on user preferences"""
    try:
        result = await get_recommendation(request.preferences)
        
        return RecommendationResponse(
            laptop=result["laptop"],
            marketing_text=result["marketing_text"],
            reasoning=result["reasoning"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendation: {str(e)}")

@router.get("/laptops")
async def get_laptops():
    """Get all available laptops"""
    try:
        laptops = await get_all_laptops()
        return {"laptops": laptops}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching laptops: {str(e)}")

@router.post("/generate-marketing")
async def generate_marketing(request: MarketingRequest):
    """Generate marketing content for a specific laptop"""
    try:
        marketing_text = generate_marketing_content(request.laptop, request.user_preferences)
        return {"marketing_text": marketing_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating marketing content: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "laptop-recommendation"} 