// src/app/components/layout/DashboardLayout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { HomeIcon } from '../../lib/icons';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-40 ${sidebarOpen ? 'block' : 'hidden'}`}
        >
          <div className="fixed inset-0">
            <div
              className="absolute inset-0 bg-gray-600 opacity-75"
              onClick={() => setSidebarOpen(false)}
            ></div>
          </div>
          <div className="relative flex flex-col flex-1 w-64 max-w-xs bg-white">
            <div className="absolute top-0 right-0 -mr-14 p-1">
              <button
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                <HomeIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-indigo-600">Puppy Spa</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <a
                  href="#"
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-indigo-800"
                >
                  <HomeIcon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                >
                  <HomeIcon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" />
                  History
                </a>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Receptionist</p>
                  <a
                    href="#"
                    className="text-xs font-medium text-indigo-200 hover:text-white"
                  >
                    View profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <HomeIcon className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

