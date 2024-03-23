import { z } from "zod";
import { User, UserType } from "@prisma/client";

export const OnboardingSchema = z.object({
  step: z.number(),
  name: z.string().min(2).max(255),
  type: z.enum([UserType.COMPANY, UserType.INTERN]),
  interests: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        id: z.string(),
      })
    )
    .optional(),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        id: z.string(),
      })
    )
    .optional(),
});
