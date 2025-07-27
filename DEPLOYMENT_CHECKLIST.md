# 🚀 Deployment Checklist - Dell Laptop Advisor

## ✅ Pre-Deployment Checklist

### GitHub Repository
- [ ] Code is pushed to GitHub
- [ ] Repository is public (for free tier deployment)
- [ ] All files are committed

### MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account
- [ ] Created M0 Free cluster
- [ ] Set up database user (username/password)
- [ ] Set network access to allow all IPs (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Tested connection string locally

### Environment Variables Ready
- [ ] MongoDB connection string
- [ ] Gemini API key
- [ ] Backend URL (after Render deployment)

## 🔧 Backend Deployment (Render)

### Render Account Setup
- [ ] Created Render account
- [ ] Connected GitHub repository

### Service Configuration
- [ ] Service name: `dell-laptop-advisor-api`
- [ ] Root directory: `backend`
- [ ] Environment: `Python 3`
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Environment Variables (Render)
- [ ] `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/dell_laptop_advisor`
- [ ] `GEMINI_API_KEY` = `your_actual_api_key`

### Deployment
- [ ] Clicked "Create Web Service"
- [ ] Deployment completed successfully
- [ ] Service URL noted: `https://your-app-name.onrender.com`
- [ ] Health check passed: `/health` endpoint returns `{"status": "healthy"}`

## 🎨 Frontend Deployment (Vercel)

### Vercel Account Setup
- [ ] Created Vercel account
- [ ] Connected GitHub repository

### Project Configuration
- [ ] Framework preset: `Create React App`
- [ ] Root directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`

### Environment Variables (Vercel)
- [ ] `REACT_APP_API_URL` = `https://your-render-app-name.onrender.com`

### Deployment
- [ ] Clicked "Deploy"
- [ ] Deployment completed successfully
- [ ] Frontend URL noted: `https://your-app-name.vercel.app`

## 🔗 Post-Deployment Configuration

### CORS Update
- [ ] Updated `backend/main.py` with Vercel domain
- [ ] Pushed changes to GitHub
- [ ] Render auto-redeployed

### Testing
- [ ] Backend health check: `https://your-app-name.onrender.com/health`
- [ ] Frontend loads: `https://your-app-name.vercel.app`
- [ ] Questionnaire works
- [ ] Recommendations generated
- [ ] AI content appears
- [ ] Buy links work

## 📊 Monitoring Setup

### Render Monitoring
- [ ] Checked service logs
- [ ] Verified uptime
- [ ] Monitored resource usage

### Vercel Monitoring
- [ ] Checked deployment status
- [ ] Verified build success
- [ ] Monitored function performance

## 🎉 Final Verification

### User Experience
- [ ] Welcome page loads correctly
- [ ] Questionnaire is interactive
- [ ] Results page shows recommendations
- [ ] Marketing content is generated
- [ ] Dell links work properly

### Technical Verification
- [ ] API endpoints respond correctly
- [ ] Database connection is stable
- [ ] Gemini API integration works
- [ ] CORS issues resolved
- [ ] No console errors in browser

## 🔄 Continuous Deployment

### Automatic Deployments
- [ ] Render auto-deploys on GitHub push
- [ ] Vercel auto-deploys on GitHub push
- [ ] Environment variables persist across deployments

### Rollback Plan
- [ ] Know how to rollback on Render
- [ ] Know how to rollback on Vercel
- [ ] Have backup of working configuration

## 💰 Cost Monitoring

### Free Tier Limits
- [ ] Render: 750 hours/month
- [ ] Vercel: Unlimited deployments
- [ ] MongoDB Atlas: 512MB storage
- [ ] Gemini API: Check quota usage

---

## 🚨 Troubleshooting Quick Reference

### If Backend Won't Start
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection
4. Check Python version compatibility

### If Frontend Can't Connect
1. Verify CORS settings
2. Check API URL in environment variables
3. Test backend health endpoint
4. Check browser console for errors

### If Database Issues
1. Verify MongoDB Atlas cluster is running
2. Check network access settings
3. Verify connection string format
4. Test connection locally

### If AI Features Don't Work
1. Verify Gemini API key is correct
2. Check API quota and limits
3. Test API key locally
4. Check API response in browser network tab 