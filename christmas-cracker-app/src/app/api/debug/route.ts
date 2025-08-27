import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables (without exposing sensitive data)
    const envCheck = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 20)}...` : 'not set',
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }

    // Test database connection
    let dbConnection = { success: false, error: null }
    try {
      await prisma.$connect()
      dbConnection = { success: true, error: null }
      await prisma.$disconnect()
    } catch (error) {
      dbConnection = { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }

    return NextResponse.json({
      environment: envCheck,
      database: dbConnection
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ 
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
