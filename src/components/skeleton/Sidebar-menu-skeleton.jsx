import { Skeleton } from "@/components/ui/skeleton";

export function SidebarMenuSkeleton({ itemCount = 8 }) {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="space-y-2 px-4">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2">
            <Skeleton className="h-5 w-5 rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
