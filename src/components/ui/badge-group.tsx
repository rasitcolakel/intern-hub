// create a badge group component

import React from "react";
import { Badge, BadgeProps, defaultVariants } from "./badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  badges: BadgeProps[];
  offset?: number;
};

export const numberToBadgeVariant = (number: number) => {
  return Object.keys(defaultVariants)[
    number % Object.keys(defaultVariants).length
  ] as keyof typeof defaultVariants;
};

export const BadgeGroup = ({ badges, offset = 3 }: Props) => {
  const showBadges = badges.slice(0, offset);
  const hiddenBadges = badges.slice(offset);

  return (
    <div className="flex gap-2">
      {showBadges.map((badge, index) => (
        <Badge
          key={index}
          {...badge}
          variant={badge.variant ?? numberToBadgeVariant(index)}
        />
      ))}
      {hiddenBadges.length > 0 && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge variant="outline" className="text-xs cursor-pointer">
              +{hiddenBadges.length}
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {hiddenBadges.map((badge, index) => (
                <Badge
                  key={index}
                  {...badge}
                  variant={badge.variant ?? numberToBadgeVariant(index)}
                />
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
};
