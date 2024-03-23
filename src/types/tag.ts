import { Tag } from "@prisma/client";

export type TMinifiedTag = Pick<Tag, "id" | "name">;
