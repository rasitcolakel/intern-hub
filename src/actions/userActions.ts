"use server";

import prisma from "@/db/db";
import { UserCreatedEvent } from "@/types/user";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export const createUser = async (payload: UserCreatedEvent) => {
  const user: Prisma.UserCreateInput = {
    id: payload.data.id,
    email: payload.data.email_addresses[0]?.email_address,
    name: `${payload.data.first_name} ${payload.data.last_name}`,
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
