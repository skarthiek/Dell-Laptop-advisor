# 🚀 Deployment Guide - Dell Laptop Advisor

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - For backend deployment
3. **Vercel Account** - For frontend deployment  
4. **MongoDB Atlas Account** - For database
5. **Google Gemini API Key** - For AI features

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier is sufficient)
4. Set up database access (username/password)
5. Set up network access (allow all IPs: 0.0.0.0/0)

### 1.2 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `dell_laptop_advisor`

**Example:**
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/dell_laptop_advisor
```

## 🔧 Step 2: Deploy Backend on Render

### 2.1 Prepare Your Repository
1. Push your code to GitHub
2. Ensure `backend/` folder contains:
   - `main.py`
   - `requirements.txt`
   - `render.yaml` (optional)
   - `Procfile`
   - `runtime.txt`

### 2.2 Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `dell-laptop-advisor-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 2.3 Set Environment Variables
In Render dashboard, go to "Environment" tab and add:

```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/dell_laptop_advisor
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (usually 2-3 minutes)
3. Note your service URL: `https://your-app-name.onrender.com`

## 🎨 Step 3: Deploy Frontend on Vercel

### 3.1 Prepare Frontend
1. Update `frontend/vercel.json` with your Render backend URL
2. Update `frontend/env.production` with your Render backend URL

### 3.2 Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3 Set Environment Variables
In Vercel dashboard, go to "Settings" → "Environment Variables":

```
REACT_APP_API_URL=https://your-render-app-name.onrender.com
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment (usually 1-2 minutes)
3. Your app will be available at: `https://your-app-name.vercel.app`

## 🔗 Step 4: Update CORS Settings

### 4.1 Update Backend CORS
In your `backend/main.py`, update the CORS origins with your Vercel domain:

```python
allow_origins=[
    "http://localhost:3001", 
    "http://127.0.0.1:3001",
    "https://your-app-name.vercel.app",  # Your Vercel domain
]
```

### 4.2 Redeploy Backend
1. Commit and push your changes to GitHub
2. Render will automatically redeploy

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend
- Visit: `https://your-render-app-name.onrender.com/health`
- Should return: `{"status": "healthy"}`

### 5.2 Test Frontend
- Visit: `https://your-app-name.vercel.app`
- Should show the Dell Laptop Advisor welcome page

### 5.3 Test Full Flow
1. Go through the questionnaire
2. Check if recommendations work
3. Verify AI-generated content appears

## 🔧 Troubleshooting

### Common Issues

1. **Backend Not Starting**
   - Check Render logs for errors
   - Verify environment variables are set
   - Ensure MongoDB connection string is correct

2. **Frontend Can't Connect to Backend**
   - Verify CORS settings in backend
   - Check `REACT_APP_API_URL` in Vercel environment variables
   - Ensure backend URL is accessible

3. **Database Connection Issues**
   - Verify MongoDB Atlas network access allows all IPs
   - Check username/password in connection string
   - Ensure cluster is running

4. **Gemini API Errors**
   - Verify API key is correct
   - Check API quota and limits
   - Ensure API key is set in Render environment variables

### Useful Commands

```bash
# Test backend locally
cd backend
python main.py

# Test frontend locally
cd frontend
npm start

# Check MongoDB connection
cd backend
python test_gemini.py
```

## 📊 Monitoring

### Render Monitoring
- Check Render dashboard for logs
- Monitor service uptime
- Check resource usage

### Vercel Monitoring
- Check Vercel dashboard for deployment status
- Monitor function execution times
- Check for build errors

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployments:
- Push to your main branch → Automatic deployment
- No manual intervention needed
- Easy rollback to previous versions

## 💰 Cost Estimation

### Free Tier (Sufficient for testing):
- **Render**: Free tier includes 750 hours/month
- **Vercel**: Free tier includes unlimited deployments
- **MongoDB Atlas**: Free tier includes 512MB storage

### Paid Tier (For production):
- **Render**: $7/month for always-on service
- **Vercel**: $20/month for Pro plan
- **MongoDB Atlas**: $9/month for M2 cluster

## 🎉 Success!

Your Dell Laptop Advisor is now live at:
- **Frontend**: https://your-app-name.vercel.app
- **Backend**: https://your-render-app-name.onrender.com
- **API Docs**: https://your-render-app-name.onrender.com/docs 