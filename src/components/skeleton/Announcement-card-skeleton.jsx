import { Skeleton } from "@/components/ui/skeleton";

export function AnnouncementCardSkeleton({ itemCount = 3 }) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 bg-gray-200" />
          <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
        </div>
        <Skeleton className="mt-2 h-4 w-48 bg-gray-200" />
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {Array.from({ length: itemCount }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-100 p-4">
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
              <Skeleton className="mt-2 h-3 w-full bg-gray-200" />
              <Skeleton className="mt-1 h-3 w-full bg-gray-200" />
              <div className="mt-2 flex items-center justify-between">
                <Skeleton className="h-3 w-24 bg-gray-200" />
                <Skeleton className="h-3 w-16 bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
