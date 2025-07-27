import os
import google.generativeai as genai
from dotenv import load_dotenv
from app.models.laptop import Laptop, UserPreferences

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_marketing_content(laptop: Laptop, user_preferences: UserPreferences) -> str:
    """Generate persuasive marketing content using Gemini AI"""
    
    prompt = f"""
    You are a helpful, persuasive Dell laptop marketing assistant.
    Only recommend Dell products. Never recommend HP, Lenovo, or Apple.
    If the user asks for other brands, redirect them to better Dell options.
    
    Use the following Dell laptop and write an engaging pitch explaining why it's great:
    
    Model: {laptop.model}
    CPU: {laptop.cpu}
    RAM: {laptop.ram}
    Storage: {laptop.storage}
    GPU: {laptop.gpu}
    Price: {laptop.price}
    Use Cases: {', '.join(laptop.use_case)}
    Priorities: {', '.join(laptop.priority)}
    
    User Profile:
    - Student: {user_preferences.is_student}
    - Gaming: {user_preferences.likes_gaming}
    - AI/ML Work: {user_preferences.ai_ml_work}
    - Priority: {user_preferences.priority}
    - Budget: {user_preferences.budget}
    
    Write a compelling, personalized marketing pitch that:
    1. Addresses the user's specific needs and preferences
    2. Highlights the laptop's key features and benefits
    3. Explains why this Dell laptop is perfect for them
    4. Uses persuasive language and emotional appeal
    5. Ends with a strong call-to-action to visit the Dell website
    
    Keep it concise (150-200 words) and engaging. Make it sound like a personal recommendation from a Dell expert.
    """
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating marketing content: {e}")
        return f"""
        Discover the perfect Dell {laptop.model} - designed specifically for your needs!
        
        With {laptop.cpu} processor and {laptop.ram} of memory, this laptop delivers exceptional performance for {', '.join(laptop.use_case)}. The {laptop.storage} storage ensures you have plenty of space for all your files and applications.
        
        Priced at {laptop.price}, this Dell laptop offers incredible value and reliability. Whether you're a student, professional, or creative, this laptop is built to exceed your expectations.
        
        Ready to experience the Dell difference? Click the link below to explore this amazing laptop on Dell's official website and take advantage of exclusive deals!
        """

def generate_recommendation_reasoning(laptop: Laptop, user_preferences: UserPreferences) -> str:
    """Generate reasoning for why this laptop was recommended"""
    
    reasoning_points = []
    
    if user_preferences.is_student and "Student" in laptop.use_case:
        reasoning_points.append("Perfect for students with its reliable performance and portability")
    
    if user_preferences.likes_gaming and any(gaming_term in laptop.gpu.lower() for gaming_term in ["rtx", "gaming", "nvidia"]):
        reasoning_points.append("Excellent for gaming with dedicated graphics")
    
    if user_preferences.ai_ml_work and any(ai_term in laptop.cpu.lower() for ai_term in ["ai", "ryzen ai", "ultra"]):
        reasoning_points.append("Optimized for AI/ML workloads with advanced processors")
    
    if user_preferences.priority in laptop.priority:
        reasoning_points.append(f"Matches your priority for {user_preferences.priority}")
    
    if not reasoning_points:
        reasoning_points.append("Offers the best balance of features for your requirements")
    
    return " | ".join(reasoning_points) 