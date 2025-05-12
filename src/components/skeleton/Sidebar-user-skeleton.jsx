import { Skeleton } from "@/components/ui/skeleton";

export function SidebarUserSkeleton() {
  return (
    <div className="border-t border-gray-700/50 p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
        <div>
          <Skeleton className="h-4 w-28 bg-gray-700" />
          <Skeleton className="mt-1 h-3 w-20 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
