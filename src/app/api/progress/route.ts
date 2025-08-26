import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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
      const progress = await prisma.progressEntry.findUnique({
        where: {
          userId_date: {
            userId,
            date: new Date(date)
          }
        }
      })
      return NextResponse.json(progress)
    } else {
      // Get all progress for user
      const progress = await prisma.progressEntry.findMany({
        where: { userId },
        orderBy: { date: 'desc' }
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
    const body = await request.json()
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
      return NextResponse.json({ error: 'User ID and date are required' }, { status: 400 })
    }

    // Upsert progress entry
    const progress = await prisma.progressEntry.upsert({
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

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error saving progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
