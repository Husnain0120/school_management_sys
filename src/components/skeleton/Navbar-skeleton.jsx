import { Bell, Menu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSkeleton() {
  return (
    <header className="relative bg-white shadow-sm">
      {/* Green top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-800"></div>

      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 md:hidden">
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo and title */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600"
              >
                <path d="M12 10v.01M12 14v.01M9 14v.01M15 14v.01M21 12V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4" />
                <path d="M3 12v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
                <path d="M12 4v4" />
              </svg>
            </div>
            <Skeleton className="h-6 w-56 bg-gray-200" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="relative rounded-full p-1 text-gray-500">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User profile skeleton */}
          <div className="flex items-center">
            <div className="hidden md:block text-right mr-3">
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="mt-1 h-3 w-24 bg-gray-200" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </header>
  );
}
