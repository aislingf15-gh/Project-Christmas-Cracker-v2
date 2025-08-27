# Vercel Deployment Guide

## Prerequisites
- A Vercel account (free at vercel.com)
- Your existing Supabase PostgreSQL database (already set up!)

## Step 1: Get Your Supabase Database URL

Since you already have Supabase working, you just need to get your connection string:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy your **Connection string** (URI format)
5. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

## Step 2: Deploy to Vercel

### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project
6. Configure your project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `christmas-cracker-app`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your project
cd christmas-cracker-app

# Deploy
vercel
```

## Step 3: Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
DATABASE_URL=your_supabase_connection_string
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

### Your Supabase Database URL Format:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

## Step 4: Database Setup (Already Done!)

Since you already have Supabase working, your database should already be set up. However, if you need to verify:

### Option A: Using Vercel CLI
```bash
# Navigate to your project
cd christmas-cracker-app

# Verify your database connection
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### Option B: Check in Supabase Dashboard
1. Go to your Supabase project
2. Navigate to **Table Editor**
3. You should see your tables: `User`, `ProgressEntry`, `ChallengeSettings`, `LeaderboardEntry`

## Step 5: Verify Deployment

1. Your app should be available at `https://your-project-name.vercel.app`
2. Test the login functionality
3. Test creating and saving progress entries
4. Check that the leaderboard works

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**
   - Verify your Supabase `DATABASE_URL` is correct
   - Ensure your Supabase project is active
   - Check if your database password is correct

2. **Build Errors**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript/ESLint configurations

3. **API Route Errors**
   - Check function logs in Vercel dashboard
   - Verify environment variables are set correctly
   - Ensure Prisma client is generated

### Environment Variables Checklist:
- [ ] `DATABASE_URL` - Your Supabase PostgreSQL connection string
- [ ] `NODE_ENV` - Set to "production"
- [ ] `NEXTAUTH_URL` - Your Vercel app URL
- [ ] `NEXTAUTH_SECRET` - A secure random string

## Benefits of Vercel + Supabase:

1. **Perfect Integration** - Both services work seamlessly together
2. **Your Existing Data** - All your current data will be preserved
3. **Automatic Scaling** - Both Vercel and Supabase scale automatically
4. **Real-time Features** - Supabase provides real-time database capabilities
5. **Free Tiers** - Both services have generous free plans

## Next Steps:

1. Deploy your app following the steps above
2. Use your existing Supabase database URL
3. Test all functionality
4. Share your app URL with users!

Your app should work perfectly on Vercel with your existing Supabase database - no data migration needed!
