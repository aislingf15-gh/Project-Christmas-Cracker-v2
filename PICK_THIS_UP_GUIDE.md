# 🎄 Christmas Cracker Project - Pick This Up Guide

## 📋 Project Overview

**Project Christmas Cracker** is a holiday wellness challenge app that helps users track their daily habits from September 1st to December 25th. Users can track 8 daily requirements including steps, exercise, hydration, protein, sleep, reading, supplements, and adulting tasks.

**Live URL:** [Your Vercel deployment URL]
**GitHub Repository:** https://github.com/aislingf15-gh/Project-Christmas-Cracker-v2

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

### Backend & Database
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **API Routes:** Next.js API routes
- **Authentication:** Custom email-based system

### Development Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Code Formatting:** Prettier (via Tailwind)
- **Version Control:** Git/GitHub

---

## 🌐 Platforms & Services Used

### 1. **Vercel** - Hosting & Deployment
- **Purpose:** Hosts the Next.js application
- **Features Used:**
  - Automatic deployments from GitHub
  - Environment variable management
  - Custom domain support
  - Edge functions (if needed)

**Setup:**
1. Connect GitHub repository to Vercel
2. Configure environment variables (see below)
3. Deploy automatically on push to main branch

### 2. **Supabase** - Database & Backend
- **Purpose:** PostgreSQL database and API
- **Features Used:**
  - PostgreSQL database
  - Connection pooling
  - Row Level Security (RLS)

**Database Schema:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  steps_completed BOOLEAN DEFAULT FALSE,
  water_goal_met BOOLEAN DEFAULT FALSE,
  protein_goal_met BOOLEAN DEFAULT FALSE,
  sleep_goal_met BOOLEAN DEFAULT FALSE,
  reading_completed BOOLEAN DEFAULT FALSE,
  supplements_taken BOOLEAN DEFAULT FALSE,
  exercise_completed BOOLEAN DEFAULT FALSE,
  adulting_task_done BOOLEAN DEFAULT FALSE,
  steps_count INTEGER,
  water_intake INTEGER,
  protein_intake INTEGER,
  sleep_hours INTEGER,
  reading_minutes INTEGER,
  exercise_minutes INTEGER,
  adulting_task TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Leaderboard table
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_days_tracked INTEGER DEFAULT 0,
  perfect_days INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);
```

### 3. **GitHub** - Version Control
- **Purpose:** Source code repository
- **Features Used:**
  - Git version control
  - Branch protection
  - Issue tracking
  - Pull requests

---

## 🔧 Environment Variables

### Required Environment Variables (Vercel)

```env
# Database
DATABASE_URL=postgresql://postgres.weovzieksanrzpaacbed:M25albay25!@aws-1-eu-west-2.pooler.supabase.com:5432/postgres

# Optional: Analytics, monitoring, etc.
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### How to Set Environment Variables in Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with appropriate environment (Production, Preview, Development)

---

## 🚀 How the Application Works

### 1. **User Authentication Flow**
```
User enters name/email → Check if user exists → Create new user if needed → Store in localStorage → Load user data
```

**Key Files:**
- `src/app/page.tsx` - LoginScreen component
- `src/app/api/users/route.ts` - User creation/lookup API

### 2. **Progress Tracking Flow**
```
User checks off daily tasks → Save to local state → Send to API → Store in Supabase → Update leaderboard
```

**Key Files:**
- `src/app/page.tsx` - TrackerTab component
- `src/app/api/progress/route.ts` - Progress save/load API

### 3. **Data Flow Architecture**
```
Frontend (Next.js) ↔ API Routes ↔ Prisma ORM ↔ Supabase PostgreSQL
```

### 4. **Key Components Structure**
```
src/app/page.tsx
├── LoginScreen
├── OverviewTab
├── TrackerTab
├── ProgressTab
└── CommunityTab
```

---

## 📁 Project Structure

```
christmas-cracker-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── health/route.ts
│   │   │   ├── leaderboard/route.ts
│   │   │   ├── progress/route.ts
│   │   │   └── users/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ProgressChart.tsx
│   └── lib/
│       └── db.ts
├── prisma/
│   └── schema.prisma
├── public/
│   └── logo.png
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🔄 Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your DATABASE_URL to .env.local

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

### Deployment Process
1. **Code Changes:** Make changes locally
2. **Test:** Run `npm run dev` and test functionality
3. **Commit:** `git add . && git commit -m "description"`
4. **Push:** `git push origin main`
5. **Deploy:** Vercel automatically deploys from GitHub

### Database Changes
```bash
# After modifying Prisma schema
npx prisma generate
npx prisma db push

# To view database in browser
npx prisma studio
```

---

## 🛠️ Key Features & How They Work

### 1. **Daily Requirements Tracking**
- **8 core requirements:** Steps, Exercise, Hydration, Protein, Sleep, Reading, Supplements, Adulting
- **Christmas adaptations:** Special tasks for Christmas Eve/Day
- **Weekly adulting:** Only shows on Sundays

### 2. **Progress Visualization**
- **Completion percentage:** Real-time calculation
- **Streak tracking:** Current and longest streaks
- **Perfect days:** Days with all requirements met

### 3. **Community Features**
- **Leaderboard:** Real-time community rankings
- **Progress sharing:** Users can share achievements
- **Anonymous participation:** Privacy-focused design

### 4. **Mobile Optimization**
- **Responsive design:** Works on all screen sizes
- **Touch-friendly:** Optimized for mobile interaction
- **Progressive enhancement:** Core functionality works everywhere

---

## 🔍 Troubleshooting Guide

### Common Issues & Solutions

#### 1. **Database Connection Issues**
```bash
# Check if DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
npx prisma db pull

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

#### 2. **Build Failures on Vercel**
- Check environment variables are set correctly
- Ensure all dependencies are in package.json
- Verify TypeScript compilation passes locally

#### 3. **API Route Issues**
- Check Vercel function logs
- Verify API route file structure
- Test endpoints locally with `npm run dev`

#### 4. **Mobile Display Issues**
- Test on different screen sizes
- Check Tailwind responsive classes
- Verify viewport meta tag

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Optional)
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'
```

### Database Monitoring
- **Supabase Dashboard:** Monitor database performance
- **Prisma Studio:** View and edit data locally
- **Vercel Logs:** Check API route performance

---

## 🔐 Security Considerations

### Current Security Measures
- **Input validation:** All user inputs are validated
- **SQL injection protection:** Prisma ORM prevents SQL injection
- **Environment variables:** Sensitive data stored securely
- **HTTPS only:** Vercel enforces HTTPS

### Recommended Enhancements
- **Rate limiting:** Add API rate limiting
- **Input sanitization:** Additional input cleaning
- **CORS configuration:** Restrict API access if needed

---

## 🚀 Future Enhancements

### Potential Features
- **Email notifications:** Daily reminders
- **Social sharing:** Share progress on social media
- **Achievement badges:** Gamification elements
- **Data export:** Download progress data
- **Custom goals:** User-defined targets
- **Dark mode:** Theme switching

### Technical Improvements
- **Caching:** Redis for better performance
- **CDN:** Static asset optimization
- **Testing:** Unit and integration tests
- **CI/CD:** Automated testing pipeline

---

## 📞 Support & Resources

### Documentation
- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Prisma:** https://www.prisma.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Community
- **GitHub Issues:** Report bugs and feature requests
- **Vercel Community:** Deployment and hosting help
- **Supabase Discord:** Database and backend support

---

## 🎯 Quick Start Checklist

For someone picking up this project:

- [ ] Clone repository: `git clone https://github.com/aislingf15-gh/Project-Christmas-Cracker-v2.git`
- [ ] Install dependencies: `npm install`
- [ ] Set up environment variables in `.env.local`
- [ ] Run database migrations: `npx prisma db push`
- [ ] Start development: `npm run dev`
- [ ] Test all features locally
- [ ] Deploy to Vercel (if needed)

---

**🎄 Happy coding and Merry Christmas! 🎄**

*This guide should help anyone understand and work with your Christmas Cracker project. Feel free to update it as the project evolves!*
