#!/usr/bin/env python3
"""
Test script to verify environment variables are loaded correctly
"""

import os
from dotenv import load_dotenv

def test_environment():
    """Test if environment variables are loaded correctly"""
    
    print("🔍 Testing Environment Variables...")
    print("=" * 50)
    
    # Load .env file if it exists
    load_dotenv()
    
    # Check MongoDB URI
    mongodb_uri = os.getenv("MONGODB_URI")
    if mongodb_uri:
        print("✅ MONGODB_URI found:")
        print(f"   {mongodb_uri[:50]}...")
        if "localhost" in mongodb_uri:
            print("⚠️  Warning: Using localhost - this might not work in production")
        elif "mongodb+srv://" in mongodb_uri:
            print("✅ Using MongoDB Atlas connection")
        else:
            print("ℹ️  Using custom MongoDB connection")
    else:
        print("❌ MONGODB_URI not found!")
    
    # Check Gemini API Key
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        print("✅ GEMINI_API_KEY found:")
        print(f"   {gemini_key[:20]}...")
    else:
        print("❌ GEMINI_API_KEY not found!")
    
    # Check PORT
    port = os.getenv("PORT")
    if port:
        print(f"✅ PORT found: {port}")
    else:
        print("ℹ️  PORT not set (will use default)")
    
    print("=" * 50)
    
    if not mongodb_uri:
        print("❌ Environment variables not properly configured!")
        return False
    
    print("✅ Environment variables look good!")
    return True

if __name__ == "__main__":
    test_environment() 