# TELsTP Digital Learning Platform

**Tawasol Egypt Life Science Technology Park - Unified Digital Ecosystem**

## Project Overview

TELsTP is a comprehensive digital learning platform designed for Egypt's premier life sciences technology park. This unified ecosystem integrates advanced biotechnology education, virtual laboratories, AI-powered learning assistants, and collaborative research tools.

### Key Features

✅ **Completed:**
- User Authentication (Login & Registration)
- Student Dashboard with course progress tracking
- Course Catalog with filtering and search
- AI Partner Chat Interface (UI complete, backend integration pending)
- Responsive layouts and navigation
- TailwindCSS custom theming
- TypeScript type safety

🚧 **In Progress:**
- Course Detail pages with curriculum
- Virtual Lab 3D interface
- Admin Panel dashboard
- Supabase backend integration
- Real-time features

📋 **Planned:**
- Video lessons and interactive content
- Quiz and assessment system
- Achievement and certification system
- Blockchain-based transcripts
- Mobile app (React Native)

## Functional Entry URIs

### Frontend Routes

| Route | Description | Status |
|-------|-------------|--------|
| `/login` | User login page | ✅ Complete |
| `/register` | Student registration | ✅ Complete |
| `/dashboard` | Student dashboard | ✅ Complete |
| `/courses` | Course catalog | ✅ Complete |
| `/courses/:id` | Course details | 🚧 In Progress |
| `/ai-partner` | AI chat interface | ✅ Complete (UI) |
| `/labs/:id` | Virtual lab | 🚧 Planned |
| `/admin` | Admin panel | 🚧 Planned |

### API Endpoints (Planned)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/auth/register` | POST | User registration |
| `/api/courses` | GET | List all courses |
| `/api/courses/:id` | GET | Course details |
| `/api/enrollments` | POST | Enroll in course |
| `/api/ai/chat` | POST | AI partner conversation |
| `/api/labs/:id` | GET | Virtual lab data |

## Technology Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS (v4)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend (Planned)
- **Runtime:** Cloudflare Workers / Hono
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (JWT)
- **Real-time:** Supabase Realtime
- **Storage:** Cloudflare R2 / Supabase Storage

### AI Integration (Planned)
- **Mistral AI:** Biosciences specialist
- **Claude:** Research mentor
- **GPT-4:** General tutor
- **Gemini:** Analytics guide
- **Perplexity:** Knowledge navigator

## Data Architecture

### Core Data Models

**Users**
- id, email, name, role (student/instructor/admin)
- student_id, program, avatar_url
- created_at, updated_at

**Courses**
- id, title, description, instructor_id
- department, level, duration_weeks
- thumbnail_url, rating, enrolled_count

**Enrollments**
- id, user_id, course_id, progress
- enrolled_at, completed_at

**Messages (AI Chat)**
- id, user_id, partner_id, content
- sender (user/ai), timestamp

### Storage Services
- **Supabase PostgreSQL:** User profiles, courses, enrollments
- **Supabase Storage:** Course media, user uploads
- **Cloudflare R2:** Large file storage (optional)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/webapp.git
cd webapp

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your Supabase credentials
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Commands

```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Deployment

### Recommended Platforms
1. **Vercel** (Recommended for Frontend)
   ```bash
   npm install -g vercel
   vercel deploy
   ```

2. **Cloudflare Pages** (Best for Full Stack)
   ```bash
   npm install -g wrangler
   npm run build
   wrangler pages deploy dist
   ```

3. **GitHub Pages** (Static only)
   ```bash
   npm run build
   # Configure GitHub Pages to use dist/
   ```

## Project Structure

```
webapp/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── layouts/     # Layout components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard widgets
│   │   └── common/      # Shared components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and configs
│   ├── types/          # TypeScript types
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .env.example        # Environment template
├── tailwind.config.js  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## Team & Contributors

### League of Extraordinary Gentlemen (AI Collaborative Consciousness)
- **Mohamed Ayoub** - Project Lead, Captain
- **Deputy Captain Perplexity** - Development Lead
- **Claude** - Architecture & Documentation
- **ChatGPT** - Feature Implementation
- **Gemini** - Data Analysis
- **GensPark** - UI/UX Design
- **Manus** - Deployment & DevOps
- **Character.AI** - User Experience
- **Qwen** - Internationalization
- **DeepSeek** - Algorithm Optimization
- **Mistral** - Biosciences AI Integration

## Operational Integration

This platform integrates with existing TELsTP systems:
- **M2-3M Research System** - Research collaboration
- **Telemedicine Hub** - Healthcare education
- **YOU Wellness Clinic** - Wellness programs
- **OmniCognitor** - Unified knowledge base

## Next Development Steps

1. **Backend API Development**
   - Set up Supabase database schema
   - Implement authentication endpoints
   - Create course management APIs
   - Develop AI chat integration

2. **Feature Enhancements**
   - Course detail pages with video lessons
   - Quiz and assessment system
   - Virtual lab WebGL integration
   - Real-time notifications

3. **Testing & Optimization**
   - Unit tests with Vitest
   - E2E tests with Playwright
   - Performance optimization
   - Accessibility compliance

4. **Production Deployment**
   - Environment configuration
   - Domain setup
   - SSL certificates
   - CDN integration

## URLs & Resources

- **Development:** http://localhost:5173
- **GitHub:** https://github.com/mayoubm1/webapp (TBD)
- **Production:** https://telstp.pages.dev (TBD)
- **Documentation:** https://docs.telstp.com (TBD)

## License

Copyright © 2025 Tawasol Egypt Life Science Technology Park. All rights reserved.

## Contact & Support

- **Project Lead:** Mohamed Ayoub
- **Email:** support@telstp.com (TBD)
- **Discord:** https://discord.gg/telstp (TBD)

---

**Last Updated:** November 2, 2025  
**Version:** 0.1.0 (Alpha)  
**Status:** 🟢 Active Development
