import { InternItem } from "@/types/user";
import React, { useCallback } from "react";
import { Card } from "./card";
import Image from "next/image";
import { BadgeProps } from "./badge";
import { BadgeGroup } from "./badge-group";
import { Separator } from "./separator";

type Props = {
  user: InternItem;
};

export default function InternCard({ user }: Props) {
  const interestBadges: BadgeProps[] = user.interests.map((interest) => ({
    children: interest.name,
  }));

  const tagsBadges: BadgeProps[] = user.tags.map((tag) => ({
    children: tag.name,
  }));

  return (
    <Card className="flex flex-col gap-y-4 p-4">
      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 bg-gray-200 rounded-full">
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">{user.name}</h4>
          <BadgeGroup badges={interestBadges} offset={5} />
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-x-2">
        <p className="text-md text-gray-500">{user.about}</p>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-medium">İlgi Alanları</p>
        <BadgeGroup badges={tagsBadges} offset={6} />
      </div>
    </Card>
  );
}
