import { OnboardingSchema } from "@/schemas/onboarding";
import { z } from "zod";
import { TMinifiedTag } from "./tag";
import { TMinifiedInterest } from "./interests";

export type TOnboardingSchema = z.infer<typeof OnboardingSchema>;

export type TOnboardingAtom = {
  tags: TMinifiedTag[];
  interests: TMinifiedInterest[];
};
