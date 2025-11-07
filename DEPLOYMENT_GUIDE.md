# TELsTP Platform - Production Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
- ✅ Vercel CLI installed
- ✅ GitHub repository created
- ✅ Vercel account
- ✅ Supabase backend configured

---

## Option 1: Deploy via Vercel CLI (Recommended)

### Step 1: Push to GitHub

```bash
# Navigate to project
cd /home/user/webapp

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Login to Vercel

```bash
# Login to Vercel (opens browser for authentication)
vercel login
```

### Step 3: Deploy

```bash
# First deployment (will prompt for configuration)
vercel

# Or deploy directly to production
vercel --prod
```

**Vercel will ask:**
- Set up and deploy? **Yes**
- Which scope? **Your Vercel account**
- Link to existing project? **No**
- What's your project name? **telstp-platform**
- In which directory is your code? **./**
- Want to override settings? **No**

### Step 4: Configure Environment Variables

```bash
# Add environment variables to Vercel
vercel env add VITE_SUPABASE_URL production
# Enter: https://vrfyjirddfdnwuffzqhb.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE

vercel env add VITE_API_URL production
# Enter: https://vrfyjirddfdnwuffzqhb.supabase.co/rest/v1
```

### Step 5: Redeploy with Environment Variables

```bash
vercel --prod
```

---

## Option 2: Deploy via Vercel Dashboard

### Step 1: Push to GitHub (same as above)

### Step 2: Import from GitHub

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard, go to:
- **Project Settings** → **Environment Variables**

Add these variables:
```
VITE_SUPABASE_URL = https://vrfyjirddfdnwuffzqhb.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE
VITE_API_URL = https://vrfyjirddfdnwuffzqhb.supabase.co/rest/v1
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

---

## Option 3: One-Command Deployment (Using Vercel Token)

```bash
# Deploy with Vercel token
VERCEL_TOKEN=your_vercel_token vercel --prod --token=$VERCEL_TOKEN --yes
```

---

## 🔧 Vercel Configuration

The `vercel.json` file is already configured with:
- ✅ Build command
- ✅ Output directory
- ✅ Framework detection
- ✅ SPA routing rewrites
- ✅ Environment variables

---

## 🌐 Post-Deployment Steps

### 1. Verify Deployment

```bash
# Test the production URL
curl https://your-project.vercel.app

# Or visit in browser
open https://your-project.vercel.app
```

### 2. Update DNS (Optional)

If you have a custom domain:
1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., telstp.edu.eg)
3. Configure DNS records as instructed

### 3. Configure Supabase for Production

Update Supabase allowed origins:
1. Go to Supabase Dashboard
2. Navigate to Authentication → URL Configuration
3. Add your Vercel URL to "Site URL" and "Redirect URLs"

### 4. Enable Analytics (Optional)

In Vercel Dashboard:
- Enable Vercel Analytics
- Enable Web Vitals monitoring

---

## 🔒 Security Checklist

- ✅ Environment variables set in Vercel
- ✅ `.env` file not committed to Git
- ✅ Supabase RLS policies enabled
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ CORS configured in Supabase
- ⚠️ Add production URL to Supabase allowed origins

---

## 📊 Monitoring

### Vercel Dashboard
- Monitor deployments
- View build logs
- Check performance metrics
- Manage environment variables

### Supabase Dashboard
- Monitor API usage
- Check database queries
- View authentication logs
- Monitor storage usage

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure TypeScript compiles without errors

### Environment Variables Not Working
- Redeploy after adding env vars
- Check variable names (must start with VITE_)
- Verify values are correct

### 404 Errors on Routes
- Verify `vercel.json` has SPA rewrites
- Check that all routes are defined in React Router

### API Errors
- Check Supabase URL and keys
- Verify RLS policies allow access
- Check browser console for CORS errors

---

## 🚀 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Run build checks before deployment

To disable auto-deploy:
- Go to Project Settings → Git
- Toggle "Production Branch" or "Preview Deployments"

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] Database migrations applied in Supabase
- [ ] Sample data loaded (optional)
- [ ] Environment variables configured
- [ ] Build runs successfully locally
- [ ] All tests passing
- [ ] README updated with production URL
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Team members added to Vercel project

---

## 🎯 Expected Production URLs

After deployment, you'll get:

- **Production:** `https://telstp-platform.vercel.app`
- **Preview:** `https://telstp-platform-git-main-yourname.vercel.app`
- **Custom Domain:** `https://your-domain.com` (if configured)

---

## 📞 Support

**Vercel Documentation:** https://vercel.com/docs
**Vercel Support:** https://vercel.com/support
**Supabase Documentation:** https://supabase.com/docs

---

## 🎉 Success!

Once deployed, your TELsTP platform will be live and accessible worldwide with:
- ⚡ Lightning-fast performance (Vercel CDN)
- 🔒 Automatic HTTPS
- 🌍 Global edge network
- 📊 Built-in analytics
- 🔄 Automatic deployments
- 💚 99.99% uptime

**Welcome to production! 🚀**
