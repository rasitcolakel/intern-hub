import { OnboardingSchema } from "@/schemas/onboarding";
import { z } from "zod";
import { TMinifiedTag } from "./tag";
import { TMinifiedInterest } from "./interests";
import { Option } from "@/components/ui/multiple-selector";

export type TOnboardingSchema = z.infer<typeof OnboardingSchema>;

export type TOnboardingAtom = {
  tags: Option[];
  interests: Option[];
};
