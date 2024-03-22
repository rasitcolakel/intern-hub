import { Prisma, PrismaClient } from "@prisma/client";

const prismaClientSingleton = () =>
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

if (process.env.NODE_ENV !== "production") {
  prisma.$on("query" as never, (e: Prisma.QueryEvent) => {
    // eslint-disable-next-line no-console
    console.log(`Duration: ${e.duration}ms`);
  });
}
