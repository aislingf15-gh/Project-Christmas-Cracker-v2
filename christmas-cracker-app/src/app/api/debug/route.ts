import { NextRequest, NextResponse } from 'next/server'
import { prisma, checkDatabaseConnection } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables (without exposing sensitive data)
    const envCheck = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 50)}...` : 'not set',
      databaseUrlHost: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : 'not set',
      databaseUrlPort: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).port : 'not set',
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }

    // Test database connection with detailed error info
    let dbConnection = { success: false, error: null, details: null }
    try {
      console.log('Attempting database connection...')
      await prisma.$connect()
      console.log('Database connection successful')
      dbConnection = { success: true, error: null, details: 'Connected successfully' }
      await prisma.$disconnect()
    } catch (error) {
      console.error('Database connection failed:', error)
      dbConnection = { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : null
      }
    }

    // Test the checkDatabaseConnection function specifically
    let checkConnectionResult = { success: false, error: null }
    try {
      const isConnected = await checkDatabaseConnection()
      checkConnectionResult = { success: isConnected, error: null }
    } catch (error) {
      checkConnectionResult = { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }

    return NextResponse.json({
      environment: envCheck,
      database: dbConnection,
      checkConnection: checkConnectionResult,
      recommendations: [
        'If database connection fails, check the DATABASE_URL format',
        'Make sure you\'re using the Transaction pooler connection string from Supabase',
        'Verify the password in the connection string is correct',
        'Check if Supabase database is active and accessible'
      ]
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ 
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
