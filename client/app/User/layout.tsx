'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SidebarLink } from '@/types/index'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [username, setUsername] = useState('User')
  const [isLoaded, setIsLoaded] = useState(false)

  // ✅ SAFE localStorage - Only runs client-side
  useEffect(() => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username')
      if (storedUsername) {
        setUsername(storedUsername)
      }
      setIsLoaded(true)
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username')
    }
    window.location.href = '/'
  }

  // Show loading state during hydration
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-5">
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex">
          <div className="md:w-64 w-16 border-r h-[calc(100vh-70px)]"></div>
          <main className="flex-1 p-6 bg-gray-50 animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </main>
        </div>
      </div>
    )
  }

  const sidebarLinks: SidebarLink[] = [
    { name: 'Task', path: '/User' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link href="/User">
          <div className="text-xl font-bold text-gray-800">UserPortal</div>
        </Link>

        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi, <span className="font-medium text-gray-800">{username}</span>!</p>
          <button 
            onClick={handleLogout}
            className="border border-gray-300 rounded-full text-sm px-4 py-1 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout Area: Sidebar + Content */}
      <div className="flex"> 
        
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-[calc(100vh-70px)] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center py-3 px-4 gap-3 ${
                pathname.startsWith(item.path)
                  ? 'border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-600 font-medium'
                  : 'hover:bg-gray-100/90 border-white text-gray-700'
              }`}
            >
              <p className="md:block hidden">{item.name}</p>
            </Link>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
