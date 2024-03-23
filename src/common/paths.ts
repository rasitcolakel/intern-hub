export const publicPaths = {
  home: "/",
  webhooks: "/api/webhooks(.*)",
  signIn: "/sign-in",
  signUp: "/sign-up",
};

export const privatePaths = {
  onboarding: "/onboarding",
};

export const paths = {
  ...publicPaths,
  ...privatePaths,
};
