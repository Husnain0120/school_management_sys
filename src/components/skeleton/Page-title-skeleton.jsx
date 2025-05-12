import { Skeleton } from "@/components/ui/skeleton";

export function PageTitleSkeleton() {
  return (
    <div className="bg-white px-4 py-2 shadow-sm md:px-6">
      <Skeleton className="h-6 w-24 bg-gray-200" />
    </div>
  );
}
