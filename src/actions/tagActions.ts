import prisma from "@/db/db";
import { TMinifiedTag } from "@/types/tag";
import { unstable_cache } from "next/cache";

export const getMinifiedTags = async (): Promise<TMinifiedTag[]> => {
  return await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getCachedTags = unstable_cache(
  async () => getMinifiedTags(),
  ["tags"]
);
