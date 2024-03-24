"use server";
import { redirect } from "next/navigation";
import { getMe } from "@/actions/userActions";
import { UserButton } from "@clerk/nextjs";
import { paths } from "@/common/paths";

export default async function Home() {
  const me = await getMe();

  const redirectToOnboarding = !me?.type;
  console.log("redirectToOnboarding", redirectToOnboarding);
  if (redirectToOnboarding) return redirect(paths.onboarding);

  return <></>;
}
