"use client";
import React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchPRs } from "@/functions/document";
import { useEffect } from "react";
import { PRCard } from "@/components/global/pullrequestcard";
import { PullRequestChipProps } from "@/@types/type";
import { PrSkeletonCard } from "@/components/global/prskeleton";
export default function Page() {
  const [prs, setPrs] = useState<PullRequestChipProps[]>([]);
  useEffect(() => {
    const fetchPrData = async () => {
      const res = await fetchPRs();
      const sorted = res.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setPrs(sorted);
    };
    fetchPrData();
  }, []);
  if (prs.length === 0) {
    return (
      <div className=" flex flex-col gap-4  w-full max-w-7xl  py-6 px-9 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PrSkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="  flex flex-col  gap-4  w-full max-w-7xl  py-6  sm:px-6 lg:px-20">
      <div className="px-4 mt-5">
        <h1 className="text-2xl font-bold tracking-tight">My Contributions</h1>
        <p className="text-muted-foreground mt-1">
          Track your suggestions, pull requests, and improvements to technical
          content across the platform.
        </p>
      </div>

      <div className="rounded-xl  p-4  shadow-sm">
        <div className="flex items-center  justify-between mb-6">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="OPEN" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">OPEN</SelectItem>
              <SelectItem value="dark">MERGED</SelectItem>
              <SelectItem value="system">CLOSED</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground">
            Showing 2 contributions
          </div>
        </div>
        <div className=" w-full flex flex-col items-center justify-center gap-5">
          {prs.map((pr) => (
            <PRCard
              title={pr.title}
              Blog={pr.blog.title}
              date={pr.createdAt}
              status={pr.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
