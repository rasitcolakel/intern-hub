/* eslint-disable class-methods-use-this */

import { User, Prisma, UserType } from "@prisma/client";

import prisma from "@/db/db";
import { GetInternsRequest } from "@/types/user";

export const getInterns = async (args: GetInternsRequest) => {
  const { page, limit, ...rest } = args;

  return prisma.user.findMany({
    ...rest,
    where: {
      ...rest.where,
      type: UserType.INTERN,
    },
    include: {
      tags: true,
      interests: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });
};

export const getInternsCount = async (
  args?: Prisma.UserCountArgs
): Promise<number> => {
  return prisma.user.count({
    ...args,
    where: {
      ...args?.where,
      type: UserType.INTERN,
    },
  });
};
