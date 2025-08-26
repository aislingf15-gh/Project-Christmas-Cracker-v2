import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, message } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user and their progress data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        progressEntries: {
          orderBy: { date: 'desc' },
          take: 30 // Last 30 days
        },
        leaderboardEntry: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate current stats
    const totalDays = user.progressEntries.length
    const perfectDays = user.progressEntries.filter(entry => 
      entry.stepsCompleted && entry.waterGoalMet && entry.proteinGoalMet && 
      entry.sleepGoalMet && entry.readingCompleted && entry.supplementsTaken && 
      entry.exerciseCompleted && entry.adultingTaskDone
    ).length
    
    const currentStreak = user.leaderboardEntry?.currentStreak || 0
    const longestStreak = user.leaderboardEntry?.longestStreak || 0

    // Create shareable progress summary
    const progressSummary = {
      userId,
      userName: user.name,
      message: message || "Just shared my Christmas Cracker progress! 🎄",
      stats: {
        totalDays,
        perfectDays,
        currentStreak,
        longestStreak,
        completionRate: totalDays > 0 ? Math.round((perfectDays / totalDays) * 100) : 0
      },
      sharedAt: new Date()
    }

    // Store the shared progress (you could add a SharedProgress model to the database)
    // For now, we'll just return the summary
    return NextResponse.json({
      success: true,
      message: "Progress shared successfully!",
      summary: progressSummary,
      shareUrl: `/community/share/${userId}` // This would be a public share URL
    })

  } catch (error) {
    console.error('Error sharing progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get recent shared progress (in a real app, this would come from a database)
    // For now, we'll return a placeholder
    return NextResponse.json({
      recentShares: [],
      message: "No recent shares yet"
    })
  } catch (error) {
    console.error('Error fetching shared progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
