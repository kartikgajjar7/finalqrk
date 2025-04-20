import type React from "react";
import { cn } from "@/lib/utils";

// Skeleton component defined inline
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen w-screen bg-[#0B0A0A] text-white">
      <main className="container mx-auto px-4 py-8 max-w-[830px]">
        {/* Author info */}
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-gray-800" />
            <Skeleton className="h-4 w-48 bg-gray-800" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-10 w-28 rounded-md bg-gray-800" />
          </div>
        </div>

        {/* Engagement metrics */}
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-6 w-16 bg-gray-800" />
          <div className="ml-auto flex gap-4">
            <Skeleton className="h-6 w-6 bg-gray-800" />
            <Skeleton className="h-6 w-6 bg-gray-800" />
          </div>
        </div>

        {/* Content editor toolbar */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
          <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
        </div>

        {/* Featured image */}
        <div className="mb-8">
          <Skeleton className="h-[300px] w-full rounded-lg bg-gray-800" />
        </div>

        {/* Intro paragraph */}
        <div className="space-y-2 mb-8">
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-[90%] bg-gray-800" />
          <Skeleton className="h-4 w-[95%] bg-gray-800" />
        </div>

        {/* First heading */}
        <div className="mb-6">
          <Skeleton className="h-8 w-[70%] bg-gray-800" />
        </div>

        {/* Second paragraph */}
        <div className="space-y-2 mb-8">
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-[85%] bg-gray-800" />
        </div>

        {/* Second heading */}
        <div className="mb-6">
          <Skeleton className="h-8 w-[50%] bg-gray-800" />
        </div>
      </main>
    </div>
  );
}
