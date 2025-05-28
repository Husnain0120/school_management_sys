import {
  Settings2,
  Users,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Globe,
  Lock,
  ChevronRight,
  Search,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Award,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: "Attendance Settings",
      description: "Configure attendance system, dates and tracking options",
      icon: Users,
      href: "settings/attendance",
      badge: "Active",
      badgeColor: "bg-green-100 text-green-700",
    },
    // Uncomment these to see how it behaves with more items
    // {
    //   title: "Course Management",
    //   description: "Manage courses, modules, and learning materials",
    //   icon: BookOpen,
    //   href: "/settings/courses",
    //   badge: "24 Courses",
    //   badgeColor: "bg-blue-100 text-blue-700",
    // },
    // {
    //   title: "Academic Calendar",
    //   description: "Configure semesters, terms and important dates",
    //   icon: Calendar,
    //   href: "/settings/calendar",
    //   badge: "2023-2024",
    //   badgeColor: "bg-purple-100 text-purple-700",
    // },
  ];

  return (
    <div className="flex flex-col  bg-gray-50">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your LMS system configuration
              </p>
            </div>
            <div className="flex items-center gap-3"></div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {settingsCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link key={index} href={category.href}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-blue-50 transition-colors">
                          <IconComponent className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                        {category.badge && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${category.badgeColor}`}
                          >
                            {category.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
                      <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors flex items-center">
                        Configure
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer - now properly fixed at bottom */}
      <div className="bg-gray-50 md:mt-59 mt-51 sm:mt-50 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-500 mb-2 md:mb-0">
              <p>LMS Admin Panel v2.1.4</p>
              <p className="mt-1">
                © 2024 Education System. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Help
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </button>
              <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
