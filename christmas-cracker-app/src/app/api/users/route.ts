import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    console.log('User GET request for email:', email)

    if (!email) {
      console.error('Email is missing from request')
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        progressEntries: {
          orderBy: { date: 'desc' },
          take: 30 // Last 30 entries
        },
        challengeSettings: true
      }
    })

    console.log('User lookup result:', user ? 'found' : 'not found')
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    console.log('User POST request:', { email, name: name ? 'present' : 'missing' })

    if (!email || !name) {
      console.error('Missing required fields for user creation:', { hasEmail: !!email, hasName: !!name })
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    console.log('Creating new user with email:', email)

    // Test database connection first
    try {
      await prisma.$connect()
      console.log('Database connection successful')
    } catch (dbError) {
      console.error('Database connection failed:', dbError)
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    // Create user with default challenge settings
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          challengeSettings: {
            create: {
              // Default settings will be applied from schema
            }
          }
        },
        include: {
          challengeSettings: true
        }
      })

      console.log('User created successfully:', user.id)
      return NextResponse.json(user)
    } catch (createError) {
      console.error('User creation failed:', createError)
      
      // Check if it's a unique constraint violation
      if (createError instanceof Error && createError.message.includes('Unique constraint')) {
        return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
      }
      
      return NextResponse.json({ 
        error: 'User creation failed', 
        details: createError instanceof Error ? createError.message : 'Unknown error'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
