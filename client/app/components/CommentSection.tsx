'use client'

import React, { useState, useEffect } from 'react'
import type { Comment } from '@/types/index'

const getUserColor = (username: string) => {
  const colors: { [key: string]: string } = {
    'demouser': 'bg-blue-100 text-blue-700 border-blue-200',
    'johndoe': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'alicej': 'bg-orange-100 text-orange-700 border-orange-200',
    'default': 'bg-purple-100 text-purple-700 border-purple-200',
  }
  return colors[username.toLowerCase()] || colors['default']
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
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // ✅ SAFE FETCH - Handles errors + ensures array
  useEffect(() => {
    fetchComments()
  }, [taskId])

  const fetchComments = async () => {
    try {
      console.log('Fetching comments for taskId:', taskId) // DEBUG
      const response = await fetch(`/api/tasks/${taskId}/comments`)
      
      if (!response.ok) {
        console.error('API Error:', response.status, await response.text())
        return
      }
      
      const data = await response.json()
      console.log('API Response:', data) // DEBUG
      
      // ✅ ENSURE ARRAY - Fix map error
      if (Array.isArray(data)) {
        setComments(data)
      } else {
        console.error('API returned non-array:', data)
        setComments([])
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setComments([])
    }
  }

  const postComment = async () => {
    if (!text.trim() || loading) return

    setLoading(true)
    
    // Optimistic update
    const tempId = Date.now()
    const tempComment: Comment = {
      id: tempId,
      content: text.trim(),
      createdAt: new Date().toISOString(),
      taskId,
      userId: 1,
      user: { id: 1, username: 'DemoUser' }
    }
    setComments(prev => [tempComment, ...prev])
    const commentText = text.trim()
    setText('')

    try {
      console.log('Posting comment:', commentText) // DEBUG
      const response = await fetch(`/api/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText })
      })

      console.log('POST Response:', response.status) // DEBUG
      
      if (response.ok) {
        const newComment = await response.json()
        setComments(prev => [newComment, ...prev.slice(1)])
      } else {
        const errorText = await response.text()
        console.error('POST failed:', response.status, errorText)
        // Revert optimistic update
        setComments(prev => prev.slice(1))
        setText(commentText)
      }
    } catch (error) {
      console.error('POST error:', error)
      setComments(prev => prev.slice(1))
      setText(commentText)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-8 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-bold text-gray-600 flex items-center gap-2">
          <span>Discussion</span>
          <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full">
            {comments.length}
          </span>
        </h3>
      </div>

      <div className="p-6">
        <div className={`relative rounded-xl border transition-all bg-white mb-8 ${
          isFocused ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' : 'border-gray-300 shadow-sm'
        }`}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Add your comment..."
            maxLength={500}
            disabled={loading}
            className="w-full h-28 p-4 rounded-xl resize-none outline-none text-gray-600 placeholder:text-gray-400"
          />
          <div className="flex items-center justify-between px-3 pb-3">
            <span className={`text-xs ${text.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
              {text.length > 0 && `${text.length}/500`}
            </span>
            <button
              onClick={postComment}
              disabled={!text.trim() || loading}
              className="px-4 py-2 rounded-lg font-medium text-sm transition-all disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>

        {/* ✅ SAFE MAP - Only maps if array */}
        <div className="space-y-6">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getUserColor(c.user.username)}`}>
                  <span className="text-sm font-bold">{c.user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-gray-600 text-sm">{c.user.username}</span>
                    <span className="text-xs text-gray-400">{formatTimestamp(c.createdAt)}</span>
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 text-gray-600 text-sm leading-relaxed border border-gray-100">
                    {c.content}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No comments yet</p>
              <p className="text-sm">Be the first to start the discussion!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
