import { PageTitleSkeleton } from "./page-title-skeleton";
import { StatsCardsSkeleton } from "./stats-cards-skeleton";
import { ContentCardSkeleton } from "./content-card-skeleton";
import { AnnouncementCardSkeleton } from "./announcement-card-skeleton";

export function ContentSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageTitleSkeleton />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <StatsCardsSkeleton />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ContentCardSkeleton />
          <AnnouncementCardSkeleton />
        </div>
      </main>
    </div>
  );
}
