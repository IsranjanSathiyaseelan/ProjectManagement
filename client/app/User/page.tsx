'use client'

import React from 'react'
import Link from 'next/link'
import type { Task } from '@/types/index'

const tasks: Task[] = [
  { id: 1, title: "Design Landing Page", description: "Create the UI for the new landing page", assignee: "John Doe", dueDate: "2026-01-30", status: "In Progress" },
  { id: 2, title: "Fix Login Bug", description: "Resolve authentication issue in login flow", assignee: "Jane Smith", dueDate: "2026-01-25", status: "Pending" },
  { id: 3, title: "Write Unit Tests", description: "Add tests for dashboard components", assignee: "Alice Johnson", dueDate: "2026-02-01", status: "Completed" },
]

const DashboardPage = () => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Completed": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="md:p-10 p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Tasks</h2>

      {tasks.map((task) => (
        <Link
          key={task.id}
          // CORRECTION: Must be '/User' (Capital U) to match your folder name
          href={`/User/task/${task.id}`} 
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-4 p-5 max-w-4xl rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
        >
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold text-lg">
              {task.title.charAt(0)}
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-gray-800">{task.title}</p>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
          <div className="text-sm text-gray-700 font-medium">{task.assignee}</div>
          <div className="text-sm text-gray-600 font-medium">{task.dueDate}</div>
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default DashboardPage