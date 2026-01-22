'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // Import this to highlight active link
import type { SidebarLink } from '@/types/index'

export default function UserLayout({
  children, // This is the dynamic page content
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname(); // Get current URL to check active state

  const sidebarLinks: SidebarLink[] = [
    { name: 'Task', path: '/User' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link href="/User">
          <div className="text-3xl text-gray-700">UserPortal</div>
        </Link>

        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! User</p>
          <button className="border rounded-full text-sm px-4 py-1">Logout</button>
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
                // Check if the current path matches the link path
                pathname === item.path
                  ? 'border-r-4 md:border-r-[6px] bg-indigo-500/10 border-gray-500 text-gray-500'
                  : 'hover:bg-gray-100/90 border-white text-gray-700'
              }`}
            >
              <p className="md:block hidden">{item.name}</p>
            </Link>
          ))}
        </div>

        {/* Dynamic Content Area (The whitespace on the right) */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}