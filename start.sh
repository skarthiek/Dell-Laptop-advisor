#!/bin/bash

echo "🚀 Starting Dell Laptop Advisor..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can start it with: brew services start mongodb-community (macOS)"
    echo "   or: sudo systemctl start mongod (Linux)"
fi

echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🔧 Setting up environment files..."
if [ ! -f "../backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    echo "MONGODB_URI=mongodb+srv://skarthiek:@Karthiek123@cluster0.5ftbj9u.mongodb.net/dell_laptop_advisor?retryWrites=true&w=majority&appName=Cluster0" > ../backend/.env
    echo "GEMINI_API_KEY=your_gemini_api_key_here" >> ../backend/.env
    echo "⚠️  Please edit backend/.env and add your Gemini API key!"
fi

if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cp env.example .env
fi

echo "🌐 Starting backend server..."
cd ../backend
python main.py &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 5

echo "🎨 Starting frontend development server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "✅ Dell Laptop Advisor is starting up!"
echo "📱 Frontend: http://localhost:3001"
echo "🔧 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID 