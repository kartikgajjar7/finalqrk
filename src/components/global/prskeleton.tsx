import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  className?: string;
}

export function PrSkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("border border-border rounded-lg p-5", className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-[160px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-[180px]" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
}
