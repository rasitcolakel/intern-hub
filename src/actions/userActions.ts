"use server";
import { GetInternsRequest, GetInternsResponse } from "@/types/user";

import { paths } from "@/common/paths";
import prisma from "@/db/db";
import { getInterns, getInternsCount } from "@/services/intern";
import { TOnboardingSchema } from "@/types/onboarding";
import { UserCreatedEvent } from "@/types/user";
import { auth } from "@clerk/nextjs";
import { Prisma, UserType } from "@prisma/client";
import { redirect } from "next/navigation";

export const createUser = async (payload: UserCreatedEvent) => {
  const user: Prisma.UserCreateInput = {
    id: payload.data.id,
    email: payload.data.email_addresses[0]?.email_address,
    name: `${payload.data.first_name ?? ""} ${payload.data.last_name ?? ""}`,
    avatar: payload.data.profile_image_url,
  };

  try {
    const createdUser = await prisma.user.create({
      data: user,
    });
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUser = async (data: TOnboardingSchema) => {
  try {
    const me = await getMe();

    if (!me) {
      return redirect(paths.signIn);
    }

    const { type } = data;

    let updatedData: Prisma.UserUpdateInput = {
      about: data.about,
    };

    if (type === UserType.COMPANY) {
      updatedData = {
        name: data.name,
        type: data.type,
      };
    } else {
      updatedData = {
        name: data.name,
        type: data.type,
      };
      if (data.interests)
        updatedData.interests = {
          connect: data.interests.map((interest) => ({
            id: interest.id,
          })),
        };
      if (data.tags) {
        updatedData.tags = {
          connect: data.tags.map((tag) => ({
            id: tag.id,
          })),
        };
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: me.id,
      },
      data: updatedData,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const getFilter = (keys: string[], values?: string[][]) => {
  if (keys.length === 0) {
    return {};
  }

  if (keys.length === 1) {
    return {
      [keys[0]]: {
        some: {
          id: {
            in: values![0],
          },
        },
      },
    };
  }

  return {
    OR: keys.map((key, index) => ({
      [key]: {
        some: {
          id: {
            in: values![index],
          },
        },
      },
    })),
  };
};

const getFilterInputParams = (obj: Record<string, string[]>) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  return getFilter(keys, values);
};
export const fetchInterns = async (
  args: GetInternsRequest
): Promise<GetInternsResponse> => {
  try {
    const keys = {
      ...(args.interestIds?.length && { interests: args.interestIds }),
      ...(args.tagIds?.length && { tags: args.tagIds }),
    };

    args.where = {
      ...args.where,
      ...getFilterInputParams(keys),
    };

    delete args.tagIds;
    delete args.interestIds;

    const [interns, total] = await Promise.all([
      getInterns(args),
      getInternsCount({
        where: {
          ...getFilterInputParams(keys),
        },
      }),
    ]);
    return {
      interns,
      total,
      hasNext: total > args.page * args.limit,
    };
  } catch (error) {
    console.error("Error getting interns:", error);
    throw error;
  }
};
