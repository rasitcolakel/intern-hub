export const publicPaths = {
  home: "/",
  jobs: "/jobs",
  interns: "/interns",
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
