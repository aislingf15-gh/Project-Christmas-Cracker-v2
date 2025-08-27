import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    console.log('Simple test endpoint called')
    
    // Test 1: Basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Test 2: Simple query
    const userCount = await prisma.user.count()
    console.log('✅ User count query successful:', userCount)
    
    // Test 3: Create a test user
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User'
      }
    })
    console.log('✅ User creation successful:', testUser.id)
    
    // Test 4: Delete the test user
    await prisma.user.delete({
      where: { id: testUser.id }
    })
    console.log('✅ User deletion successful')
    
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      success: true,
      message: 'All database operations working!',
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Simple test failed:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
