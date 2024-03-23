"use server";
import { redirect } from "next/navigation";
import { getMe } from "@/actions/userActions";
import { UserButton } from "@clerk/nextjs";
import { paths } from "@/common/paths";

export default async function Home() {
  const me = await getMe();

  const redirectToOnboarding = me && !me?.type;

  if (redirectToOnboarding) return redirect(paths.onboarding);

  return <UserButton />;
}
