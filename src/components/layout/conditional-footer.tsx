"use client";

import { Footer } from "@/components/ui/footer";
import { usePathname } from "next/navigation";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/create-board",
  "/profile",
  "/boards/*/manage",
];

export function ConditionalFooter() {
  const pathname = usePathname();

  // Check if the current path matches any protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => {
    if (route.includes("*")) {
      // Handle wildcard routes like /boards/*/manage
      const pattern = route.replace(/\*/g, "[^/]+");
      const regex = new RegExp(`^${pattern}(/|$)`);
      return regex.test(pathname);
    }
    return pathname.startsWith(route);
  });

  // Don't render footer on protected routes
  if (isProtectedRoute) {
    return null;
  }

  return <Footer />;
}
