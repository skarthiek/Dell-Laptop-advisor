from typing import List
from app.database import get_db
from app.models.laptop import Laptop, UserPreferences
from app.services.gemini_service import generate_marketing_content, generate_recommendation_reasoning

async def get_recommendation(user_preferences: UserPreferences) -> dict:
    """Get laptop recommendation based on user preferences"""
    
    db = get_db()
    laptops = await db.laptops.find({}).to_list(length=None)
    
    # Convert to Laptop objects
    laptop_objects = [Laptop(**laptop) for laptop in laptops]
    
    # Score laptops based on user preferences
    scored_laptops = []
    
    for laptop in laptop_objects:
        score = 0
        
        # Student preference
        if user_preferences.is_student and "Student" in laptop.use_case:
            score += 10
        
        # Gaming preference
        if user_preferences.likes_gaming:
            if any(gaming_term in laptop.gpu.lower() for gaming_term in ["rtx", "gaming", "nvidia"]):
                score += 15
            elif "Gamer" in laptop.use_case:
                score += 10
        
        # AI/ML preference
        if user_preferences.ai_ml_work:
            if any(ai_term in laptop.cpu.lower() for ai_term in ["ai", "ryzen ai", "ultra"]):
                score += 15
            elif "AI/ML" in laptop.use_case:
                score += 10
        
        # Priority matching
        if user_preferences.priority in laptop.priority:
            score += 8
        
        # Budget matching
        price_numeric = extract_price_numeric(laptop.price)
        if user_preferences.budget == "budget" and price_numeric < 80000:
            score += 5
        elif user_preferences.budget == "mid-range" and 80000 <= price_numeric <= 150000:
            score += 5
        elif user_preferences.budget == "premium" and price_numeric > 150000:
            score += 5
        
        # Additional scoring based on use cases
        for use_case in laptop.use_case:
            if use_case in ["Professional", "Creator", "Productivity"] and not user_preferences.is_student:
                score += 3
            elif use_case == "Business" and not user_preferences.likes_gaming:
                score += 3
        
        scored_laptops.append((laptop, score))
    
    # Sort by score (highest first) and get top recommendation
    scored_laptops.sort(key=lambda x: x[1], reverse=True)
    
    if not scored_laptops:
        # Fallback to first laptop if no matches
        recommended_laptop = laptop_objects[0]
    else:
        recommended_laptop = scored_laptops[0][0]
    
    # Generate marketing content
    marketing_text = generate_marketing_content(recommended_laptop, user_preferences)
    reasoning = generate_recommendation_reasoning(recommended_laptop, user_preferences)
    
    return {
        "laptop": recommended_laptop.dict(),
        "marketing_text": marketing_text,
        "reasoning": reasoning,
        "score": scored_laptops[0][1] if scored_laptops else 0
    }

def extract_price_numeric(price_str: str) -> int:
    """Extract numeric price from price string"""
    try:
        # Remove currency symbols and commas, extract numbers
        import re
        numbers = re.findall(r'\d+', price_str.replace(',', ''))
        if numbers:
            return int(''.join(numbers))
        return 0
    except:
        return 0

async def get_all_laptops() -> List[dict]:
    """Get all available laptops"""
    db = get_db()
    laptops = await db.laptops.find({}).to_list(length=None)
    return laptops 