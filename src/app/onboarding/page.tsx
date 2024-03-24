import {
  getCachedInterests,
  getMinifiedInterests,
} from "@/actions/interestActions";
import { getCachedTags, getMinifiedTags } from "@/actions/tagActions";
import { getMe } from "@/actions/userActions";
import { paths } from "@/common/paths";
import OnboardingMainNavigation from "@/components/layout/onboarding/OnboardingMainNavigation";
import { redirect } from "next/navigation";

async function Onboarding() {
  const [me, tags, interests] = await Promise.all([
    getMe(),
    getCachedTags(),
    getCachedInterests(),
  ]);

  if (!me) {
    return redirect(paths.signIn);
  }

  if (me.type) {
    return redirect(paths.home);
  }

  return (
    <OnboardingMainNavigation user={me} tags={tags} interests={interests} />
  );
}

export default Onboarding;
