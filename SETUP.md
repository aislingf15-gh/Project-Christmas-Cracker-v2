# 🎄 Christmas Cracker App Setup Guide

This guide will help you set up and deploy your sophisticated Christmas Cracker app with a Ralph Lauren aesthetic.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed
- **PostgreSQL database** (local or cloud)
- **Git** for version control
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql
brew services start postgresql

# Create database
createdb christmas_cracker
```

#### Option B: Cloud Database (Recommended for Production)
- **Supabase** (Free tier available): https://supabase.com
- **Neon** (Free tier available): https://neon.tech
- **Railway** (Free tier available): https://railway.app

### 2. Environment Configuration

```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/christmas_cracker"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Migration

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 🗄️ Database Management

### View Data with Prisma Studio
```bash
npm run db:studio
```
This opens a web interface at [http://localhost:5555](http://localhost:5555) to view and edit your data.

### Reset Database
```bash
npm run db:reset
```
⚠️ **Warning**: This will delete all data!

### Update Schema
After modifying `prisma/schema.prisma`:
```bash
npm run db:push
```

## 🌐 Deployment

### Netlify Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

3. **Environment Variables**
   In Netlify dashboard → Site settings → Environment variables:
   ```
   DATABASE_URL=your-production-database-url
   NODE_ENV=production
   ```

4. **Deploy!**
   Netlify will automatically build and deploy your site.

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   ```

## 🎨 Customization

### Logo
Replace `public/logo.png` with your own logo file.

### Colors
Modify the Ralph Lauren color palette in:
- `tailwind.config.ts` - Tailwind colors
- `src/app/globals.css` - CSS variables

### Challenge Settings
Update default goals in `prisma/schema.prisma`:
```prisma
model ChallengeSettings {
  dailyStepsGoal     Int     @default(8000)
  dailyWaterGoal     Int     @default(2000)
  // ... other settings
}
```

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Database Connection Issues
1. Check your `DATABASE_URL` format
2. Ensure database is running
3. Verify network connectivity (for cloud databases)

### Prisma Issues
```bash
# Regenerate Prisma client
npm run db:generate

# Reset database (⚠️ deletes all data)
npm run db:reset
```

## 📊 API Testing

Test your API endpoints:

```bash
# Get user data
curl "http://localhost:3000/api/users?email=test@example.com"

# Save progress
curl -X POST http://localhost:3000/api/progress \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "date": "2024-12-01",
    "stepsCompleted": true,
    "waterGoalMet": true
  }'
```

## 🎯 Next Steps

1. **Add Authentication**: Integrate NextAuth.js for user login
2. **Email Notifications**: Add reminder emails for daily tracking
3. **Social Features**: Implement friend invitations and leaderboards
4. **Mobile App**: Consider React Native for mobile experience
5. **Analytics**: Add Google Analytics or Plausible for insights

## 📞 Support

If you encounter issues:

1. Check the [README.md](README.md) for detailed documentation
2. Review the [Prisma documentation](https://www.prisma.io/docs)
3. Check [Next.js documentation](https://nextjs.org/docs)

---

**Happy coding and happy holidays! 🎄✨**
