import { prisma } from '@/lib/prisma'

async function test() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected!')
    
    const users = await prisma.user.findMany()
    console.log('Users:', users)
    
    const tasks = await prisma.task.findMany()
    console.log('Tasks:', tasks)
  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
