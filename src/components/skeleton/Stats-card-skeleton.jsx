import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardsSkeleton({ cardCount = 4 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: cardCount }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-12 bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
