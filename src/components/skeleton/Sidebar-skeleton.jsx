import { SidebarHeaderSkeleton } from "./sidebar-header-skeleton"
import { SidebarMenuSkeleton } from "./sidebar-menu-skeleton"
import { SidebarUserSkeleton } from "./sidebar-user-skeleton"

export function SidebarSkeleton() {
  return (
    <div className="hidden md:flex w-64 flex-col bg-gray-800">
      <SidebarHeaderSkeleton />
      <SidebarMenuSkeleton />
      <SidebarUserSkeleton />
    </div>
  )
}
