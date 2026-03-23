import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { routeAccess } from './lib/routes';
import { NextResponse } from 'next/server';

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const {userId, sessionClaims} = await auth();
  const url = new URL(req.url);

  const role = 
    userId && sessionClaims?.metadata?.role
      ? sessionClaims.metadata.role
      : userId
      ? "patient"
      : "sign-in";

  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    // Redirect unauthorized roles to their respective default pages
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  //continue if the user is authorized
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};































// // import { clerkMiddleware } from '@clerk/nextjs/server';
// // import { routeMatchers } from './lib/routes';
// // import { NextRequest, NextResponse } from 'next/server';



// // const checkRoleAndRedirect = (
// //   req: NextRequest,
// //   role: string | undefined,
// //   allowedRole: keyof typeof routeMatchers
// // ): NextResponse | undefined => {
// //   if (routeMatchers[allowedRole](req) && role !== allowedRole) {
// //     const url = new URL("/", req.url);
// //     console.log("Unauthorized access, redirecting to: ", url);
// //     return NextResponse.redirect(url);
// //   }
// // };


// // export default clerkMiddleware(async (auth, req) => {
// //   const {userId, sessionClaims} = await auth();

// //   const role = (sessionClaims?.metadata as { role?: string })?.role;

// //   //Role checks
// //   const Response =
// //     checkRoleAndRedirect(req, role, "admin") ||
// //     checkRoleAndRedirect(req, role, "patient") ||
// //     checkRoleAndRedirect(req, role, "doctor");

// //     if (Response) return Response;
// // });

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
// //     // Always run for API routes
// //     '/(api|trpc)(.*)',
// //   ],
// // };