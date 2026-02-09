'use client';

import {
  Bell,
  Calendar,
  ChevronRight,
  Database,
  Globe,
  KeyRound,
  LogOut,
  Moon,
  Settings as SettingsIcon,
  Shield,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SettingsPage() {
  const param = useParams();
  const id = param.id;

  const settingsCategories = [
    {
      title: 'Attendance Settings',
      description: 'Configure attendance system, dates and tracking',
      icon: Users,
      href: 'settings/attendance',
      badge: 'Active',
      badgeColor: 'bg-orange-100 text-orange-700 border border-orange-200',
    },
    {
      title: 'Change Password',
      description: 'Update your password and security settings',
      icon: KeyRound,
      href: `/d/${id}/profile/edit`,
      badge: 'Security',
      badgeColor: 'bg-black/5 text-gray-800 border border-gray-300',
    },
    {
      title: 'Notifications',
      description: 'Manage email and push notifications',
      icon: Bell,
      href: '/settings/notifications',
      badge: null,
      badgeColor: '',
    },
    {
      title: 'Privacy & Security',
      description: 'Control your privacy and security settings',
      icon: Shield,
      href: '/settings/privacy',
      badge: null,
      badgeColor: '',
    },
    {
      title: 'Data Management',
      description: 'Backup, restore and manage your data',
      icon: Database,
      href: '/settings/data',
      badge: 'New',
      badgeColor: 'bg-orange-100 text-orange-700 border border-orange-200',
    },
    {
      title: 'Appearance',
      description: 'Customize theme and display settings',
      icon: Moon,
      href: '/settings/appearance',
      badge: null,
      badgeColor: '',
    },
    {
      title: 'Language & Region',
      description: 'Set language, timezone and regional formats',
      icon: Globe,
      href: '/settings/language',
      badge: null,
      badgeColor: '',
    },
    {
      title: 'Academic Calendar',
      description: 'Configure semesters, terms and important dates',
      icon: Calendar,
      href: '/settings/calendar',
      badge: '2023-2024',
      badgeColor: 'bg-black/5 text-gray-800 border border-gray-300',
    },
  ];

  const userSettings = [
    {
      title: 'Profile Settings',
      description: 'Update personal information and preferences',
      icon: User,
      href: `/d/${id}/profile`,
      badge: null,
      badgeColor: '',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <SettingsIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                LMS System Configuration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* User Settings Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Account
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {userSettings.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link key={index} href={item.href}>
                  <div
                    className={`flex items-center justify-between p-4 ${index !== userSettings.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 active:bg-gray-100 transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2.5 rounded-xl">
                        <IconComponent className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* System Settings Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            System Configuration
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {settingsCategories.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link key={index} href={item.href}>
                  <div
                    className={`flex items-center justify-between p-4 ${index !== settingsCategories.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 active:bg-gray-100 transition-colors`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="bg-gray-100 p-2.5 rounded-xl flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-medium text-gray-900 truncate">
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badgeColor} flex-shrink-0`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            About
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">LMS Admin Panel</h3>
                  <p className="text-sm text-gray-500">Version 2.1.4</p>
                </div>
                <div className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  Latest
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-gray-700 hover:text-orange-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Help & Support
                </button>
                <button className="w-full text-left text-sm text-gray-700 hover:text-orange-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Privacy Policy
                </button>
                <button className="w-full text-left text-sm text-gray-700 hover:text-orange-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-8">
          <button className="w-full flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-2xl text-red-600 font-medium hover:bg-red-50 hover:border-red-200 active:bg-red-100 transition-colors shadow-sm">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2024 Education System. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
