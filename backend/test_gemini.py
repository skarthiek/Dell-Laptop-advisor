#!/usr/bin/env python3
"""
Test script to verify Gemini API key is properly loaded
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

def test_gemini_api():
    """Test if Gemini API key is properly loaded and working"""
    
    # Load environment variables
    load_dotenv()
    
    # Get API key
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        print("❌ GEMINI_API_KEY not found in environment variables")
        print("   Please check your .env file in the backend directory")
        return False
    
    if api_key == "your_gemini_api_key_here":
        print("❌ GEMINI_API_KEY is still set to placeholder value")
        print("   Please update your .env file with your actual Gemini API key")
        return False
    
    print(f"✅ GEMINI_API_KEY found: {api_key[:10]}...")
    
    try:
        # Configure Gemini
        genai.configure(api_key=api_key)
        
        # Test with a simple prompt
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content("Say 'Hello from Dell Laptop Advisor!'")
        
        print("✅ Gemini API test successful!")
        print(f"   Response: {response.text}")
        return True
        
    except Exception as e:
        print(f"❌ Gemini API test failed: {str(e)}")
        print("   Please check your API key and internet connection")
        return False

def test_env_file():
    """Test if .env file exists and has required variables"""
    
    env_file = ".env"
    
    if not os.path.exists(env_file):
        print(f"❌ {env_file} file not found")
        return False
    
    print(f"✅ {env_file} file found")
    
    # Check if file has content
    with open(env_file, 'r') as f:
        content = f.read().strip()
    
    if not content:
        print(f"❌ {env_file} file is empty")
        return False
    
    print(f"✅ {env_file} file has content")
    
    # Check for required variables
    required_vars = ["MONGODB_URI", "GEMINI_API_KEY"]
    
    for var in required_vars:
        if var not in content:
            print(f"❌ {var} not found in {env_file}")
            return False
        else:
            print(f"✅ {var} found in {env_file}")
    
    return True

if __name__ == "__main__":
    print("🔍 Testing Gemini API Configuration...")
    print("=" * 50)
    
    env_ok = test_env_file()
    print()
    
    if env_ok:
        api_ok = test_gemini_api()
        print()
        
        if api_ok:
            print("🎉 All tests passed! Gemini API is properly configured.")
        else:
            print("⚠️  Environment file is OK, but API test failed.")
    else:
        print("⚠️  Environment file issues detected.")
    
    print("=" * 50) 