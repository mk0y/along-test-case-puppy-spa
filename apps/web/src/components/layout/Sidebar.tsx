// src/app/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  SettingsIcon,
} from "../../lib/icons";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "History", href: "/history", icon: CalendarIcon },
    { name: "Reports", href: "/reports", icon: ChartBarIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-indigo-600">Puppy Spa</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex gap-2 items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 h-5 w-5 ${
                    pathname === item.href
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                <span className="inline-block -mb-0.5">{item.name}</span>
              </Link>
            ))}
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
              <p className="text-sm font-medium text-gray-700">Receptionist</p>
              <Link
                href="/settings"
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
