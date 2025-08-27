import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with optimized settings for serverless environments
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Optimize for serverless environments
  __internal: {
    engine: {
      // Use connection pooling optimized for serverless
      connectionLimit: 1,
      pool: {
        min: 0,
        max: 1
      }
    }
  }
})

// Only create one instance in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Add connection health check with retry logic
export async function checkDatabaseConnection() {
  const maxRetries = 3
  let retryCount = 0

  while (retryCount < maxRetries) {
    try {
      await prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      retryCount++
      console.error(`Database connection attempt ${retryCount} failed:`, error)
      
      if (retryCount >= maxRetries) {
        console.error('Max retries reached for database connection')
        return false
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 100))
    }
  }
  
  return false
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
