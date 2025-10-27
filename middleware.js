import { auth } from "./auth";

const protectedRoutes = ["/my-account", "/create-list"];

export default auth((req) => {
  const { nextUrl } = req;

  const isProtected = protectedRoutes.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !req.auth) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/my-account", "/create-list"],
};
