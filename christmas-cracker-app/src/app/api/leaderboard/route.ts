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

    // Get user's progress entries - order by date ascending for proper streak calculation
    const progressEntries = await prisma.progressEntry.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    })

    // Calculate streaks and stats
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    const totalDaysTracked = progressEntries.length
    let perfectDays = 0

    // Calculate longest streak and perfect days
    for (const entry of progressEntries) {
      const hasAnyActivity = entry.stepsCompleted || entry.waterGoalMet || 
                           entry.proteinGoalMet || entry.sleepGoalMet || 
                           entry.readingCompleted || entry.supplementsTaken || 
                           entry.exerciseCompleted || entry.adultingTaskDone
      
      // Check if it's a perfect day (all DAILY activities completed, excluding weekly adulting task)
      if (entry.stepsCompleted && entry.waterGoalMet && 
          entry.proteinGoalMet && entry.sleepGoalMet && 
          entry.readingCompleted && entry.supplementsTaken && 
          entry.exerciseCompleted) {
        perfectDays++
      }
      
      // Calculate streak only for entries with any activity
      if (hasAnyActivity) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }

    // Calculate current streak (consecutive days ending on the most recent day)
    if (progressEntries.length > 0) {
      let streakCount = 0
      for (let i = progressEntries.length - 1; i >= 0; i--) {
        const entry = progressEntries[i]
        const hasActivity = entry.stepsCompleted || entry.waterGoalMet || 
                           entry.proteinGoalMet || entry.sleepGoalMet || 
                           entry.readingCompleted || entry.supplementsTaken || 
                           entry.exerciseCompleted || entry.adultingTaskDone
        
        if (hasActivity) {
          streakCount++
        } else {
          break
        }
      }
      currentStreak = streakCount
    }

    // Debug logging
    console.log('Leaderboard calculation results:', {
      userId,
      totalDaysTracked,
      currentStreak,
      longestStreak,
      perfectDays,
      entriesCount: progressEntries.length
    })
    
    // Log the first few entries to see what data we're working with
    if (progressEntries.length > 0) {
      console.log('Sample entry data:', {
        firstEntry: {
          date: progressEntries[0].date,
          stepsCompleted: progressEntries[0].stepsCompleted,
          waterGoalMet: progressEntries[0].waterGoalMet,
          proteinGoalMet: progressEntries[0].proteinGoalMet,
          sleepGoalMet: progressEntries[0].sleepGoalMet,
          readingCompleted: progressEntries[0].readingCompleted,
          supplementsTaken: progressEntries[0].supplementsTaken,
          exerciseCompleted: progressEntries[0].exerciseCompleted,
          adultingTaskDone: progressEntries[0].adultingTaskDone
        },
        lastEntry: {
          date: progressEntries[progressEntries.length - 1].date,
          stepsCompleted: progressEntries[progressEntries.length - 1].stepsCompleted,
          waterGoalMet: progressEntries[progressEntries.length - 1].waterGoalMet,
          proteinGoalMet: progressEntries[progressEntries.length - 1].proteinGoalMet,
          sleepGoalMet: progressEntries[progressEntries.length - 1].sleepGoalMet,
          readingCompleted: progressEntries[progressEntries.length - 1].readingCompleted,
          supplementsTaken: progressEntries[progressEntries.length - 1].supplementsTaken,
          exerciseCompleted: progressEntries[progressEntries.length - 1].exerciseCompleted,
          adultingTaskDone: progressEntries[progressEntries.length - 1].adultingTaskDone
        }
      })
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
