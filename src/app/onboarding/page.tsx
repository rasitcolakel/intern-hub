import { getMinifiedInterests } from "@/actions/interestActions";
import { getMinifiedTags } from "@/actions/tagActions";
import { getMe } from "@/actions/userActions";
import OnboardingMainNavigation from "@/components/layout/onboarding/OnboardingMainNavigation";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

const getCachedTags = unstable_cache(async () => getMinifiedTags(), ["tags"]);

const getCachedInterests = unstable_cache(
  async () => getMinifiedInterests(),
  ["interests"]
);

async function Onboarding() {
  const [me, tags, interests] = await Promise.all([
    getMe(),
    getCachedTags(),
    getCachedInterests(),
  ]);

  if (!me) {
    redirect("/sign-in");
  }

  return (
    <OnboardingMainNavigation user={me} tags={tags} interests={interests} />
  );
}

export default Onboarding;
