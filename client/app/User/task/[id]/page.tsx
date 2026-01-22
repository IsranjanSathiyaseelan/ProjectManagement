'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { Task } from '@/types/index'
import CommentSection from '../../../components/CommentSection'

/* ---------------- MOCK DATA ---------------- */
const tasks: Task[] = [
  {
    id: 1,
    title: 'Design Landing Page',
    description:
      'Create the high-fidelity UI/UX mockups for the new product landing page, focusing on conversion optimization.',
    assignee: 'John Doe',
    dueDate: '2026-01-30',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Fix Login Bug',
    description:
      'Investigate and resolve the authentication token expiry issue happening on iOS devices during the login flow.',
    assignee: 'Jane Smith',
    dueDate: '2026-01-25',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Write Unit Tests',
    description:
      'Implement comprehensive unit tests for the user dashboard components to ensure 80% code coverage.',
    assignee: 'Alice Johnson',
    dueDate: '2026-02-01',
    status: 'Completed',
  },
]

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const taskId = id ? Number(id) : null
  const task = tasks.find((t) => t.id === taskId)

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white/80">
        <div className="text-center p-10 max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            📋
          </div>
          <h1 className="text-4xl font-black text-slate-600 mb-4">Task Not Found</h1>
          <p className="text-xl text-slate-500 mb-8">The task you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            ← Back to Tasks
          </button>
        </div>
      </div>
    )
  }

  const statusStyles = {
    Pending: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25',
    'In Progress': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25',
    Completed: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25',
  }[task.status]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-lg font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-2xl transition-all duration-200 group mb-6"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tasks
        </button>

        {/* STACKED LAYOUT */}
        <div className="space-y-6 ">
          {/* TASK DETAILS - Reduced height 20% (500px → 400px) */}
          <div className="bg-white/80 border-gray-100 shadow-sm backdrop-blur-xl rounded-3xl border border-white/0 shadow-1xl overflow-hidden max-h-[400px]">
            {/* Header */}
            <div className="p-5 border-b border-slate-100/50 bg-gradient-to-r from-white/50 to-slate-50/50">
              <div className="flex justify-between items-center mb-3">
                <span className={`px-3 py-1.5 rounded-2xl text-sm font-bold shadow-md ${statusStyles} ring-2 ring-white/50`}>
                  {task.status}
                </span>
                <span className="text-sm font-mono text-slate-500 bg-slate-100/50 px-2 py-1 rounded-xl backdrop-blur-sm">
                  TASK #{task.id.toString().padStart(3, '0')}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 bg-clip-text text-transparent leading-tight">
                {task.title}
              </h1>
            </div>

            {/* Description - Reduced height 20% (200px → 160px) */}
            <div className="p-5">
              <h3 className="text-base font-bold text-slate-700 mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Description
              </h3>
              <div className="prose prose-base max-w-none text-slate-700 leading-relaxed bg-slate-50/50 rounded-xl p-5 border border-slate-200/50 max-h-[160px] overflow-y-auto">
                {task.description}
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid sm:grid-cols-2 gap-3 bg-gradient-to-b from-slate-50/80 to-white/60 p-5 border-t border-slate-100/50 backdrop-blur-sm">
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Assignee</p>
                <p className="text-xl font-black text-slate-900">{task.assignee}</p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Due Date</p>
                <p className="text-xl font-black text-slate-900">{task.dueDate}</p>
              </div>
            </div>
          </div>

          {/* DISCUSSION/COMMENTS */}
          <div>
            <CommentSection taskId={taskId!} />
          </div>
        </div>
      </div>
    </div>
  )
}
