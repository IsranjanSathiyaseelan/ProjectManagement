import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params
    const parsedTaskId = parseInt(taskId)
    const { content } = await request.json()
    
    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Comment content required' }, { status: 400 })
    }

    const username = request.headers.get('X-Username') || 'DemoUser'
    
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username }
    })

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        taskId: parsedTaskId,
        userId: user.id
      },
      include: {
        user: { select: { id: true, username: true } }
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}

// ALSO ADD GET handler (for fetching comments)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params
    const parsedTaskId = parseInt(taskId)
    
    const comments = await prisma.comment.findMany({
      where: { taskId: parsedTaskId },
      include: { user: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}
