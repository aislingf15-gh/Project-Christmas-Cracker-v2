import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Get all leaderboard entries with user info, ordered by current streak
    const leaderboard = await prisma.leaderboardEntry.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: [
        { currentStreak: 'desc' },
        { longestStreak: 'desc' },
        { perfectDays: 'desc' }
      ]
    })

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user's progress entries
    const progressEntries = await prisma.progressEntry.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    // Calculate streaks and stats
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let totalDaysTracked = progressEntries.length
    let perfectDays = 0

    // Calculate current streak (consecutive days with any activity)
    for (const entry of progressEntries) {
      const hasAnyActivity = entry.stepsCompleted || entry.waterGoalMet || 
                           entry.proteinGoalMet || entry.sleepGoalMet || 
                           entry.readingCompleted || entry.supplementsTaken || 
                           entry.exerciseCompleted || entry.adultingTaskDone
      
      if (hasAnyActivity) {
        currentStreak++
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
        
        // Check if it's a perfect day (all activities completed)
        if (entry.stepsCompleted && entry.waterGoalMet && 
            entry.proteinGoalMet && entry.sleepGoalMet && 
            entry.readingCompleted && entry.supplementsTaken && 
            entry.exerciseCompleted && entry.adultingTaskDone) {
          perfectDays++
        }
      } else {
        tempStreak = 0
      }
    }

    // Upsert leaderboard entry
    const leaderboardEntry = await prisma.leaderboardEntry.upsert({
      where: { userId },
      update: {
        currentStreak,
        longestStreak,
        totalDaysTracked,
        perfectDays,
        lastUpdated: new Date()
      },
      create: {
        userId,
        currentStreak,
        longestStreak,
        totalDaysTracked,
        perfectDays
      }
    })

    return NextResponse.json(leaderboardEntry)
  } catch (error) {
    console.error('Error updating leaderboard:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
