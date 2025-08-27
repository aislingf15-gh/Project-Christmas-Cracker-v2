import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get all progress entries for the user
    const progressEntries = await prisma.progressEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    // Get leaderboard entry
    const leaderboardEntry = await prisma.leaderboardEntry.findUnique({
      where: { userId }
    })

    return NextResponse.json({
      userId,
      progressEntries: progressEntries.map(entry => ({
        id: entry.id,
        date: entry.date,
        stepsCompleted: entry.stepsCompleted,
        waterGoalMet: entry.waterGoalMet,
        proteinGoalMet: entry.proteinGoalMet,
        sleepGoalMet: entry.sleepGoalMet,
        readingCompleted: entry.readingCompleted,
        supplementsTaken: entry.supplementsTaken,
        exerciseCompleted: entry.exerciseCompleted,
        adultingTaskDone: entry.adultingTaskDone
      })),
      leaderboardEntry
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
