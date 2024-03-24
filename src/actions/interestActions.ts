import prisma from "@/db/db";
import { TMinifiedInterest } from "@/types/interests";
import { unstable_cache } from "next/cache";

export const getMinifiedInterests = async (): Promise<TMinifiedInterest[]> => {
  return await prisma.interest.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getCachedInterests = unstable_cache(
  async () => getMinifiedInterests(),
  ["interests"]
);
