# Supabase Database Setup Instructions

## Quick Setup

Since direct PostgreSQL connection isn't available in this environment, please follow these steps to set up your database:

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/vrfyjirddfdnwuffzqhb
   - Login to your account

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Apply Migrations**
   - Copy and paste the contents of each migration file in order:
     1. `supabase/migrations/001_initial_schema.sql`
     2. `supabase/migrations/002_seed_data.sql`
     3. `supabase/migrations/003_auth_functions.sql`
   - Click "Run" for each migration

4. **Verify Setup**
   - Go to "Table Editor" to see the created tables
   - You should see: users, courses, modules, lessons, enrollments, etc.

### Option 2: Using Supabase CLI (Alternative)

If you have Supabase CLI installed locally on your machine:

\`\`\`bash
# Link to your project
supabase link --project-ref vrfyjirddfdnwuffzqhb

# Push migrations
supabase db push

# Or apply manually
supabase db execute --file supabase/migrations/001_initial_schema.sql
supabase db execute --file supabase/migrations/002_seed_data.sql
supabase db execute --file supabase/migrations/003_auth_functions.sql
\`\`\`

## Database Schema Overview

### Tables Created

1. **users** - User profiles (extends auth.users)
   - id, email, name, role, student_id, program, avatar_url

2. **courses** - Course catalog
   - id, title, description, instructor_id, department, level, duration_weeks, rating, enrolled_count

3. **modules** - Course modules
   - id, course_id, title, description, order_index

4. **lessons** - Individual lessons
   - id, module_id, title, description, type, content, video_url, duration_minutes, order_index

5. **enrollments** - User course enrollments
   - id, user_id, course_id, progress, enrolled_at, completed_at

6. **lesson_progress** - User lesson completion tracking
   - id, user_id, lesson_id, is_completed, completed_at

7. **assignments** - Course assignments
   - id, course_id, title, description, due_date, total_points

8. **submissions** - Assignment submissions
   - id, assignment_id, user_id, content, file_url, status, score, feedback

9. **ai_messages** - AI chat history
   - id, user_id, partner_id, sender, content, created_at

10. **virtual_labs** - Virtual laboratory simulations
    - id, course_id, title, description, objectives, duration_minutes, config

11. **lab_sessions** - User lab session tracking
    - id, user_id, lab_id, started_at, completed_at, results

### Security (Row Level Security)

All tables have RLS enabled with appropriate policies:
- Users can only view/edit their own data
- Public read access for courses, modules, lessons
- Enrollment-based access control for course materials

### Sample Data

The seed migration includes:
- 6 sample courses across different departments
- Modules and lessons for "Introduction to Biotechnology"
- 2 virtual labs
- 3 sample assignments

## Testing the Setup

After applying migrations, test the API:

### Test 1: Get Courses
\`\`\`bash
curl "https://vrfyjirddfdnwuffzqhb.supabase.co/rest/v1/courses" \\
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE"
\`\`\`

### Test 2: User Registration
The frontend will handle this automatically when you sign up through the UI.

## Troubleshooting

### Issue: "relation does not exist"
- Solution: Make sure you ran migration 001 first

### Issue: "permission denied"
- Solution: Check RLS policies or use service role key for admin operations

### Issue: "duplicate key value"
- Solution: Seed data already exists, skip migration 002

## Next Steps

Once the database is set up:
1. ✅ Database schema is ready
2. ✅ Sample data is loaded
3. ✅ Frontend is configured with Supabase credentials
4. ✅ API services are implemented
5. 🔄 Test user registration and login
6. 🔄 Test course enrollment
7. 🔄 Test AI chat functionality

## Environment Variables

Make sure these are set in your `.env` file:

\`\`\`env
VITE_SUPABASE_URL=https://vrfyjirddfdnwuffzqhb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE
\`\`\`

## Support

For issues or questions:
- Check Supabase logs in Dashboard → Logs
- Verify table creation in Table Editor
- Test API endpoints using Dashboard API section
