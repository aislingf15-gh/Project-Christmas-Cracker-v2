import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test user creation
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User'
      }
    })
    
    // Test progress creation
    const today = new Date()
    const testProgress = await prisma.progressEntry.upsert({
      where: {
        userId_date: {
          userId: testUser.id,
          date: today
        }
      },
      update: {
        stepsCompleted: true,
        waterGoalMet: true
      },
      create: {
        userId: testUser.id,
        date: today,
        stepsCompleted: true,
        waterGoalMet: true
      }
    })
    
    // Get all users
    const allUsers = await prisma.user.findMany({
      include: {
        progressEntries: true
      }
    })
    
    return NextResponse.json({
      success: true,
      testUser,
      testProgress,
      allUsers: allUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        progressCount: user.progressEntries.length
      }))
    })
  } catch (error) {
    console.error('Test endpoint error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: 'POST request received',
      data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Invalid JSON',
      timestamp: new Date().toISOString()
    }, { status: 400 })
  }
}
