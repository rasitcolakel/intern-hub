"use server";
import { redirect } from "next/navigation";
import { getMe } from "@/actions/userActions";
import { paths } from "@/common/paths";

export default async function Home() {
  const me = await getMe();

  const redirectToOnboarding = !me?.type;

  if (me && redirectToOnboarding) return redirect(paths.onboarding);

  return <></>;
}
