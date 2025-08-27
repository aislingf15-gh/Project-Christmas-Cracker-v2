# Vercel Deployment Fix Guide

## Issue: "User ID is required" Error

Your Christmas Cracker app is deployed on Vercel but the daily tracker is not saving progress. The error "User ID is required" indicates that the user authentication or database connection is failing.

## Root Cause

The main issue is likely that your environment variables are not properly configured in Vercel, causing the database connection to fail.

## Step-by-Step Fix

### 1. Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your Christmas Cracker project
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
DATABASE_URL=postgresql://postgres:M25albay25!@db.weovzieksanrzpaacbed.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://weovzieksanrzpaacbed.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlb3Z6aWVrc2FucnpwYWFjYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3ODk1NjIsImV4cCI6MjA3MTM2NTU2Mn0.Q0dKfwh1h84HorWkTvdaf4aNWIFob8U8ss8MiUcJY60
NODE_ENV=production
```

5. Make sure to select **Production**, **Preview**, and **Development** environments
6. Click **Save**

### 2. Test Database Connection

After adding the environment variables, visit your deployed app and go to:
```
https://your-app.vercel.app/api/debug
```

This will show you if:
- Environment variables are properly set
- Database connection is working

### 3. Redeploy Your App

1. In Vercel dashboard, go to **Deployments**
2. Find your latest deployment
3. Click the three dots menu
4. Select **Redeploy**

### 4. Test the Fix

1. Visit your deployed app
2. Create a new account or log in
3. Try to save progress in the daily tracker
4. Check if the progress is saved and appears in the progress overview

## Troubleshooting

### If the debug endpoint shows database connection failure:

1. **Check Supabase Database**: Make sure your Supabase database is active and accessible
2. **Verify Connection String**: Double-check the DATABASE_URL format
3. **Check IP Restrictions**: Ensure Vercel's IP addresses are allowed in Supabase

### If user creation fails:

1. Check the browser console for errors
2. Check Vercel function logs in the dashboard
3. Verify the database schema is properly migrated

### If progress saving still fails:

1. Check the browser network tab for API errors
2. Look at Vercel function logs for detailed error messages
3. Verify the user ID is being passed correctly

## Database Migration (if needed)

If your database schema is not up to date, you may need to run migrations:

1. In your local development environment:
```bash
cd christmas-cracker-app
npx prisma db push
```

2. Or if you have direct database access, run the Prisma migrations manually

## Monitoring

After deployment, monitor your app's performance:

1. Check Vercel Analytics for any errors
2. Monitor database connection usage
3. Watch for any API timeouts or failures

## Additional Notes

- The app uses localStorage for user session management, which should work fine in production
- All API routes now have improved error logging to help debug issues
- The debug endpoint will help identify configuration problems

## Support

If you continue to have issues after following these steps:

1. Check the Vercel function logs for detailed error messages
2. Verify your Supabase database is properly configured
3. Test the API endpoints directly using tools like Postman or curl
