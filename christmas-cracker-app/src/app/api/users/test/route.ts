import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 })
    }
    
    // Test database connection
    await prisma.$connect()
    
    // Look up user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        progressEntries: {
          orderBy: { date: 'desc' },
          take: 10
        }
      }
    })
    
    // Get all users for comparison
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({
      success: true,
      requestedEmail: email,
      userFound: !!user,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        progressCount: user.progressEntries.length,
        recentProgress: user.progressEntries.slice(0, 3)
      } : null,
      allUsers
    })
  } catch (error) {
    console.error('User test endpoint error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
