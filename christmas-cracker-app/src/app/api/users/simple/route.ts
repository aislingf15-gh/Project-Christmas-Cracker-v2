import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    console.log('Simple user creation request:', { email, name })

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    // Create user without challenge settings
    const user = await prisma.user.create({
      data: {
        email,
        name
      }
    })

    console.log('Simple user created successfully:', user.id)
    return NextResponse.json(user)
  } catch (error) {
    console.error('Simple user creation error:', error)
    return NextResponse.json({ 
      error: 'Simple user creation failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
