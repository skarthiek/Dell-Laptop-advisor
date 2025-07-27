from pydantic import BaseModel
from typing import List, Optional

class Laptop(BaseModel):
    model: str
    cpu: str
    ram: str
    storage: str
    gpu: str
    price: str
    use_case: List[str]
    priority: List[str]
    link: str

class UserPreferences(BaseModel):
    is_student: bool
    likes_gaming: bool
    ai_ml_work: bool
    priority: str  # "performance", "battery", "portability"
    budget: str  # "budget", "mid-range", "premium"

class RecommendationRequest(BaseModel):
    preferences: UserPreferences

class RecommendationResponse(BaseModel):
    laptop: Laptop
    marketing_text: str
    reasoning: str

class MarketingRequest(BaseModel):
    laptop: Laptop
    user_preferences: UserPreferences 