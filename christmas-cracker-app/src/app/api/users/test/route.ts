import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test a simple query
    const userCount = await prisma.user.count()
    
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      message: 'Users API is working!',
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Users test endpoint error:', error)
    return NextResponse.json({ 
      error: 'Users API test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
