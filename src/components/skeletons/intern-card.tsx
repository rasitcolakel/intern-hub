import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

type Props = {};

export default function SkeletonInternCard({}: Props) {
  return (
    <Card className="flex flex-col gap-y-4 p-4">
      <div className="flex items-center gap-x-2">
        <Skeleton className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="w-36 h-5" />
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
      <Separator />
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-36 h-5" />
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
      </div>
    </Card>
  );
}
