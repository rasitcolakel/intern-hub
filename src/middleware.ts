import { authMiddleware } from "@clerk/nextjs";
import { publicPaths } from "./common/paths";

export default authMiddleware({
  publicRoutes: [...Object.values(publicPaths)],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
};
