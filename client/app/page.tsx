'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim()) return

    setLoading(true)
    
    localStorage.setItem('username', username.trim())
    
    setTimeout(() => {
      setLoading(false)
      router.push('/User')
    }, 450)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-sm w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 bg-clip-text text-transparent leading-tight">
            UserPortal
          </h1>
          <p className="text-gray-500 mt-2">Enter your username to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-5 text-gray-600 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 outline-none transition-all duration-300 text-lg placeholder-gray-400 disabled:bg-gray-100/50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!username.trim() || loading}
            className="group relative w-full bg-gradient-to-r from-gray-600 to-gray-600  disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Continue to Dashboard'
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
