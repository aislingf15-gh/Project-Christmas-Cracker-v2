import { NextRequest, NextResponse } from 'next/server'
import { prisma, checkDatabaseConnection, withDatabaseRetry } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const date = searchParams.get('date')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (date) {
      // Get specific date progress
      const progress = await withDatabaseRetry(async () => {
        return await prisma.progressEntry.findUnique({
          where: {
            userId_date: {
              userId,
              date: new Date(date)
            }
          }
        })
      })
      return NextResponse.json(progress)
    } else {
      // Get all progress for user
      const progress = await withDatabaseRetry(async () => {
        return await prisma.progressEntry.findMany({
          where: { userId },
          orderBy: { date: 'desc' }
        })
      })
      return NextResponse.json(progress)
    }
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check database connection first
    const isConnected = await checkDatabaseConnection()
    if (!isConnected) {
      console.error('Database connection failed in progress POST')
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 })
    }

    const body = await request.json()
    console.log('Progress POST request body:', { ...body, userId: body.userId ? 'present' : 'missing' })
    
    const {
      userId,
      date,
      stepsCompleted,
      waterGoalMet,
      proteinGoalMet,
      sleepGoalMet,
      readingCompleted,
      supplementsTaken,
      exerciseCompleted,
      adultingTaskDone,
      stepsCount,
      waterIntake,
      proteinIntake,
      sleepHours,
      readingMinutes,
      exerciseMinutes,
      adultingTask
    } = body

    if (!userId || !date) {
      console.error('Missing required fields:', { hasUserId: !!userId, hasDate: !!date })
      return NextResponse.json({ error: 'User ID and date are required' }, { status: 400 })
    }

    console.log('Attempting to upsert progress entry for user:', userId, 'date:', date)
    
    // Upsert progress entry using retry logic
    const progress = await withDatabaseRetry(async () => {
      return await prisma.progressEntry.upsert({
        where: {
          userId_date: {
            userId,
            date: new Date(date)
          }
        },
        update: {
          stepsCompleted,
          waterGoalMet,
          proteinGoalMet,
          sleepGoalMet,
          readingCompleted,
          supplementsTaken,
          exerciseCompleted,
          adultingTaskDone,
          stepsCount,
          waterIntake,
          proteinIntake,
          sleepHours,
          readingMinutes,
          exerciseMinutes,
          adultingTask
        },
        create: {
          userId,
          date: new Date(date),
          stepsCompleted,
          waterGoalMet,
          proteinGoalMet,
          sleepGoalMet,
          readingCompleted,
          supplementsTaken,
          exerciseCompleted,
          adultingTaskDone,
          stepsCount,
          waterIntake,
          proteinIntake,
          sleepHours,
          readingMinutes,
          exerciseMinutes,
          adultingTask
        }
      })
    })

    console.log('Progress entry saved successfully:', progress.id)
    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error saving progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
