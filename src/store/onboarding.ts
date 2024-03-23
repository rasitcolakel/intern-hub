import { TOnboardingAtom } from "@/types/onboarding";
import { atom } from "jotai";

export const onboardingAtom = atom<TOnboardingAtom>({
  tags: [],
  interests: [],
});
onboardingAtom.debugLabel = "onboardingAtom";
