import { Interest } from "@prisma/client";

export type TMinifiedInterest = Pick<Interest, "id" | "name">;
