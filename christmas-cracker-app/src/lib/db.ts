import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with optimized settings for Supabase
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
    }
  }
})

// Only create one instance in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Simplified connection health check
export async function checkDatabaseConnection() {
  try {
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection check failed:', error)
    return false
  }
}

// Add a function to safely disconnect (useful for serverless environments)
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

// Add a function to handle database operations with retry logic
export async function withDatabaseRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      console.error(`Database operation attempt ${attempt} failed:`, error)
      
      // If it's a prepared statement error, we need to handle it differently
      if (error instanceof Error && error.message.includes('prepared statement')) {
        console.log('Prepared statement error detected, attempting to reconnect...')
        try {
          await prisma.$disconnect()
          await new Promise(resolve => setTimeout(resolve, 100))
          // The next operation will create a new connection
        } catch (disconnectError) {
          console.error('Error during disconnect:', disconnectError)
        }
      }
      
      if (attempt === maxRetries) {
        throw lastError
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100))
    }
  }
  
  throw lastError
}

// Add a function to create a fresh connection for critical operations
export async function withFreshConnection<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    // Disconnect existing connection
    await prisma.$disconnect()
    
    // Wait a moment for cleanup
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Execute operation (this will create a fresh connection)
    return await operation()
  } catch (error) {
    console.error('Error in fresh connection operation:', error)
    throw error
  }
}
