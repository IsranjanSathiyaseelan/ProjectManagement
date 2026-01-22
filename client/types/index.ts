import { ReactNode } from 'react'

export type SidebarLink = {
  name: string
  path: string
}

export type Comment = {
  id: number
  content: string
  createdAt: string
  taskId: number
  userId: number
  user: {
    id: number
    username: string
  }
}

export type Task = {
  id: number
  title: string
  description: string
  assignee: string
  dueDate: string
  status: 'Pending' | 'In Progress' | 'Completed'
}

