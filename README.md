# Dell Laptop Advisor 🖥️

A full-stack web application that helps users choose the best Dell laptop for their needs, powered by AI marketing assistance.

## 🧱 Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **AI Integration**: Google Gemini 1.5 Flash API
- **Architecture**: Separate frontend and backend for easy deployment

## 🎯 Features

- Interactive questionnaire to understand user needs
- AI-powered laptop recommendations
- Persuasive marketing content generation
- Direct links to Dell product pages
- Modern, responsive UI

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB
- Google Gemini API key

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend (.env):**
```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:8000
PORT=3001
```

## 📁 Project Structure

```
dell-laptop-advisor/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── tailwind.config.js
└── data.json
```

## 🔧 API Endpoints

- `POST /api/recommend` - Get laptop recommendation based on user input
- `GET /api/laptops` - Get all available laptops
- `POST /api/generate-marketing` - Generate marketing content with Gemini

## 🎨 UI Components

- Welcome page with Dell branding
- Interactive questionnaire
- Results page with recommendations
- Responsive design for all devices

## 📝 License

MIT License 