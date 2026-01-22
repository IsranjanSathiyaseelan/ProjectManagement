'use client'

import React, { useState } from 'react'
import type { Comment } from '@/types/index'


// --- Icons (Inline for zero dependencies) ---
const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
)

// --- Mock Data ---
const initialComments: Comment[] = [
  {
    id: 1,
    content: 'This design is looking much cleaner! When is the deadline?',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    userId: 2,
  },
  {
    id: 2,
    content: 'The optimistic UI makes it feel instant. Nice!',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    userId: 3,
  },
]

// --- Helper Functions ---
const getUserColor = (id: number) => {
  const colors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'bg-orange-100 text-orange-700 border-orange-200',
    'bg-purple-100 text-purple-700 border-purple-200',
  ]
  return colors[id % colors.length]
}

const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}

export default function CommentSection({ taskId }: { taskId: number }) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const post = () => {
    if (!text.trim()) return

    setComments((prev) => [
      {
        id: Date.now(),
        content: text,
        createdAt: new Date().toISOString(),
        userId: 1, // Simulating "You"
      },
      ...prev,
    ])

    setText('')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-8 overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-spacebetween">
        <h3 className="font-bold text-gray-600 flex items-center gap-2">
          Discussion
          <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full font-medium">
            {comments.length}
          </span>
        </h3>
      </div>

      <div className="p-6">
        
        {/* Input Area (Modern Card Style) */}
        <div className={`relative rounded-xl border transition-all duration-200 bg-white mb-8 ${isFocused ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' : 'border-gray-300 shadow-sm'}`}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Add your comment..."
            maxLength={500}
            className="w-full h-28 p-4 rounded-xl resize-none outline-none text-gray-600 placeholder:text-gray-400 bg-transparent text-sm sm:text-base"
          />
          
          {/* Toolbar / Actions */}
          <div className="flex items-center justify-between px-3 pb-3">
            <span className={`text-xs font-medium transition-colors ${text.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
               {text.length > 0 && `${text.length}/500`}
            </span>
            
            <button
  onClick={post}
  disabled={!text.trim()}
  className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
     disabled:bg-slate-100 disabled:text-slate-400
     bg-indigo-600 hover:bg-indigo-700 text-white
     active:bg-indigo-800 active:scale-95"
>
  Post Comment
</button>


          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-4 group">
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${getUserColor(c.userId)} shadow-sm`}
              >
                <span className="text-sm font-bold">U{c.userId}</span>
              </div>

              {/* Comment Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-600 text-sm">User {c.userId}</span>
                    {c.userId === 1 && <span className="text-[10px] bg-indigo-100 text-gray-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">You</span>}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {formatTimestamp(c.createdAt)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-gray-600 text-sm sm:text-base leading-relaxed border border-gray-100 group-hover:bg-white group-hover:border-gray-200 transition-colors duration-200">
                  {c.content}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}