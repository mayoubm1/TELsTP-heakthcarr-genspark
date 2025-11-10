# 🚀 TELsTP Platform - Complete Setup Instructions

## Current Status
- ✅ Code deployed to GitHub: https://github.com/mayoubm1/TELsTP-heakthcarr-genspark
- ✅ Deployed to Vercel: https://webapp-m84hb4mpa-tawasolnow.vercel.app
- ⚠️ Deployment is protected (401 error)
- ⚠️ Supabase database needs setup

---

## 🎯 Step-by-Step Setup (In Order!)

### **STEP 1: Set Up Supabase Database** ⭐ **DO THIS FIRST!**

#### 1.1 Open Supabase Dashboard
Navigate to: https://supabase.com/dashboard/project/vrfyjirddfdnwuffzqhb

#### 1.2 Apply Database Migrations

**Go to:** SQL Editor (left sidebar) → Click "New Query"

**Run these SQL scripts in order:**

#### **Migration 1: Initial Schema**
Copy and paste from: `/home/user/webapp/supabase/migrations/001_initial_schema.sql`

Or copy this SQL:
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  student_id TEXT,
  program TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- [Copy rest from 001_initial_schema.sql file]
```

Click **"Run"** and wait for success message.

#### **Migration 2: Seed Data**
Copy and paste from: `/home/user/webapp/supabase/migrations/002_seed_data.sql`

Click **"Run"**

#### **Migration 3: Auth Functions**
Copy and paste from: `/home/user/webapp/supabase/migrations/003_auth_functions.sql`

Click **"Run"**

#### 1.3 Verify Database Setup
- Go to **Table Editor** (left sidebar)
- You should see 11 tables: users, courses, modules, lessons, enrollments, etc.
- Click on **courses** table - you should see 6 sample courses

---

### **STEP 2: Configure Supabase for Production**

#### 2.1 Add Production URL to Supabase
1. In Supabase Dashboard, go to: **Authentication** → **URL Configuration**
2. Add these URLs:

**Site URL:**
```
https://webapp-m84hb4mpa-tawasolnow.vercel.app
```

**Redirect URLs:** (add both)
```
https://webapp-m84hb4mpa-tawasolnow.vercel.app/**
https://webapp-m84hb4mpa-tawasolnow.vercel.app/auth/callback
```

3. Click **Save**

---

### **STEP 3: Make Vercel Deployment Public**

⚠️ **Note:** Vercel's "Deployment Protection" removal might be a Pro feature. Here are your options:

#### Option A: If You Have Vercel Pro/Team Plan
1. Go to: https://vercel.com/tawasolnow/webapp/settings
2. Navigate to: **Deployment** section
3. Find: **Deployment Protection**
4. Change from "Vercel Authentication" or "Password" to **"None"** or **"Public"**
5. Save changes

#### Option B: If On Free Plan (Recommended Alternative)
The deployment should be accessible without login. The 401 error might be temporary. Try:

1. **Clear browser cache and cookies**
2. **Try in incognito/private mode**
3. **Wait 5-10 minutes** for DNS propagation
4. **Try different browser**

#### Option C: Use Deployment Protection Bypass for Testing

For automated testing or development access, you can use the bypass secret:

```bash
# Access with bypass header
curl -H "x-vercel-protection-bypass: your-secret-here" \
  https://webapp-m84hb4mpa-tawasolnow.vercel.app
```

To get your bypass secret:
1. Go to Vercel Dashboard → Project Settings → Deployment Protection
2. Find "Protection Bypass for Automation"
3. Generate a secret
4. Use it in your requests

---

### **STEP 4: Test the Production Site**

#### 4.1 Access Production URL
Open in browser: https://webapp-m84hb4mpa-tawasolnow.vercel.app

#### 4.2 Test Login Page
You should see:
- ✅ TELsTP branding
- ✅ Email and password fields
- ✅ "Sign In" button
- ✅ "Create account" link

#### 4.3 Create a Test Account
1. Click **"Create an account"**
2. Fill in:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Password:** TestPassword123!
   - **Student ID:** TEL2024001
   - **Program:** Biotechnology
3. Click **Register**

#### 4.4 Verify Registration
- Should redirect to dashboard
- Check Supabase → Table Editor → users table
- Your test user should be there

---

### **STEP 5: Configure Local Development (Optional)**

If you want to run locally:

```bash
# Clone the repository
git clone https://github.com/mayoubm1/TELsTP-heakthcarr-genspark.git
cd TELsTP-heakthcarr-genspark

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# (Already configured with your Supabase details)

# Run development server
npm run dev
```

---

## 🔍 Troubleshooting

### Issue: "Can't fetch data" Error

**Cause:** Database not set up or RLS policies blocking access

**Solution:**
1. Make sure you ran all 3 migrations in Supabase
2. Check RLS policies in Supabase → Authentication → Policies
3. Verify environment variables in Vercel are correct

### Issue: Vercel Shows 401 Error

**Possible Causes:**
1. **Deployment Protection is ON** (see Step 3)
2. **DNS propagation delay** (wait 10-15 minutes)
3. **Browser cache** (clear cache or use incognito)

**Solutions:**
- Option A: Disable deployment protection (Pro plan needed)
- Option B: Wait and retry
- Option C: Use bypass secret for testing

### Issue: Registration Fails

**Check:**
1. Supabase migrations applied correctly
2. `handle_new_user()` function exists
3. RLS policies allow INSERT on users table
4. Network tab in browser console for error details

### Issue: Login Works But No Data Shows

**Check:**
1. Sample data migration (002) was applied
2. RLS policies allow SELECT on courses table
3. Browser console for API errors

---

## 📊 Expected Behavior After Setup

### ✅ Production Site Should:
1. Load without 401 error
2. Show beautiful login page
3. Allow user registration
4. Create user in Supabase
5. Show dashboard after login
6. Display 6 sample courses
7. Allow course enrollment

### ✅ Supabase Should Have:
1. 11 tables created
2. 6 sample courses in courses table
3. Modules and lessons for courses
4. RLS policies active
5. Auth functions configured

---

## 🎓 Database Schema Summary

### Tables Created:
1. **users** - User profiles (linked to auth.users)
2. **courses** - Course catalog
3. **modules** - Course modules/chapters
4. **lessons** - Individual lessons
5. **enrollments** - User course enrollments
6. **lesson_progress** - Lesson completion tracking
7. **assignments** - Course assignments
8. **submissions** - Student submissions
9. **ai_messages** - AI chat history
10. **virtual_labs** - Virtual lab definitions
11. **lab_sessions** - Lab session tracking

### Sample Data Loaded:
- **6 Courses:**
  1. Introduction to Biotechnology
  2. Genomics and Bioinformatics
  3. AI-Powered Diagnostics
  4. Molecular Biology Essentials
  5. Pharmaceutical Development
  6. Clinical Research Methods

- **Modules & Lessons** for Biotechnology course
- **2 Virtual Labs**
- **3 Sample Assignments**

---

## 🔐 Credentials & URLs

### **Supabase:**
- **URL:** https://vrfyjirddfdnwuffzqhb.supabase.co
- **Dashboard:** https://supabase.com/dashboard/project/vrfyjirddfdnwuffzqhb
- **Anon Key:** (in .env file)

### **Vercel:**
- **Production:** https://webapp-m84hb4mpa-tawasolnow.vercel.app
- **Dashboard:** https://vercel.com/tawasolnow/webapp

### **GitHub:**
- **Repository:** https://github.com/mayoubm1/TELsTP-heakthcarr-genspark

---

## 📞 Need Help?

### Check These First:
1. ✅ All 3 Supabase migrations applied?
2. ✅ Production URL added to Supabase?
3. ✅ Vercel deployment protection disabled?
4. ✅ Cleared browser cache?

### Still Having Issues?
- Check Vercel deployment logs
- Check Supabase database logs
- Check browser console for errors
- Verify environment variables in Vercel

---

## 🎉 Success Checklist

Complete setup when you can:
- [ ] Access production URL without 401 error
- [ ] See login page with TELsTP branding
- [ ] Create a new user account
- [ ] Login successfully
- [ ] See dashboard with sample courses
- [ ] View course catalog
- [ ] Enroll in a course
- [ ] See AI partner chat interface

---

## 🚀 After Successful Setup

### Immediate Next Steps:
1. **Add more courses** to the catalog
2. **Invite instructors** to create content
3. **Test all features** thoroughly
4. **Share with beta users**

### Future Enhancements:
1. Add video lesson player
2. Implement virtual labs (3D)
3. Create quiz system
4. Build admin panel
5. Add analytics dashboard

---

**Remember:** The order matters! Do Supabase first, then Vercel configuration! 🎯

**You've got this, Captain! 💪**
