"use server";
import { auth, useAuth } from "@clerk/nextjs";
import prisma from "@/db/db";
import { redirect } from "next/navigation";
import { getMe } from "@/actions/userActions";

export default async function Home() {
  const me = await getMe();

  const redirectToOnboarding = !me?.type;

  if (redirectToOnboarding) redirect("/onboarding");

  return <button>Sign out</button>;
}
