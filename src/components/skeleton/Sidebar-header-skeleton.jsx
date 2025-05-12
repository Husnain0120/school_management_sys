import { GraduationCap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarHeaderSkeleton() {
  return (
    <div className="border-b border-gray-700/50 p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 bg-gray-700" />
          <Skeleton className="mt-1 h-3 w-12 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
