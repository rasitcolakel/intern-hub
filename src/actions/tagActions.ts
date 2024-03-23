import prisma from "@/db/db";
import { TMinifiedTag } from "@/types/tag";

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
