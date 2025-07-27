# Dell Laptop Advisor - Setup Guide

## 🚀 Quick Start

### Prerequisites

1. **Python 3.8+**
   ```bash
   python3 --version
   ```

2. **Node.js 16+**
   ```bash
   node --version
   ```

3. **MongoDB**
   - Install MongoDB Community Edition
   - Start MongoDB service

4. **Google Gemini API Key**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd "Dell laptop sugesstion"
   ```

2. **Run the startup script**
   ```bash
   ./start.sh
   ```

   This script will:
   - Install all dependencies
   - Create environment files
   - Start both backend and frontend servers

3. **Configure environment variables**
   
   Edit `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://skarthiek:@Karthiek123@cluster0.5ftbj9u.mongodb.net/dell_laptop_advisor?retryWrites=true&w=majority&appName=Cluster0
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

   Edit `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🔧 Manual Setup

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp env.example .env
# Edit .env with your API keys
python main.py
```

### Frontend Setup

```bash
cd frontend
npm install
cp env.example .env
npm start
```

## 📊 Database Setup

The application automatically:
1. Connects to MongoDB
2. Creates the `dell_laptop_advisor` database
3. Loads laptop data from `data.json` into the `laptops` collection

## 🎯 Features

### Frontend
- **Welcome Page**: Dell-branded landing page
- **Interactive Questionnaire**: 5-step preference collection
- **Results Page**: AI-generated recommendations with marketing content
- **Responsive Design**: Works on all devices

### Backend
- **FastAPI**: High-performance API framework
- **MongoDB**: NoSQL database for laptop data
- **Gemini AI**: Marketing content generation
- **Smart Matching**: Algorithm-based laptop recommendations

### AI Integration
- **Gemini 1.5 Flash**: Generates personalized marketing content
- **Prompt Engineering**: Optimized for Dell marketing
- **Fallback Content**: Works even without API key

## 🛠️ Development

### Project Structure
```
dell-laptop-advisor/
├── backend/
│   ├── app/
│   │   ├── models/          # Pydantic models
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   └── database.py      # MongoDB connection
│   ├── main.py              # FastAPI app
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   └── services/        # API services
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.js   # Styling configuration
└── data.json               # Laptop database
```

### API Endpoints

- `POST /api/recommend` - Get laptop recommendation
- `GET /api/laptops` - Get all laptops
- `POST /api/generate-marketing` - Generate marketing content
- `GET /health` - Health check

### Environment Variables

**Backend (.env)**
- `MONGODB_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini API key

**Frontend (.env)**
- `REACT_APP_API_URL`: Backend API URL
- `PORT`: Frontend port (default: 3001)

## 🚀 Deployment

### Backend Deployment
1. Set up a Python hosting service (Railway, Heroku, etc.)
2. Configure environment variables
3. Deploy the `backend/` directory

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build/` folder to a static hosting service
3. Update `REACT_APP_API_URL` to point to your backend

### Database Deployment
1. Set up MongoDB Atlas or similar
2. Update `MONGODB_URI` in backend environment
3. The app will automatically populate data on first run

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Gemini API Error**
   - Verify API key is correct
   - Check API quota and limits

3. **Frontend Can't Connect to Backend**
   - Ensure backend is running on port 8000
   - Check CORS settings
   - Verify `REACT_APP_API_URL` in frontend `.env`

4. **Port Already in Use**
   - Change ports in respective `.env` files
   - Kill processes using the ports

### Logs
- Backend logs: Check terminal where `python main.py` is running
- Frontend logs: Check browser console and terminal where `npm start` is running

## 📝 License

MIT License - Feel free to use and modify as needed! 