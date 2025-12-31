"use client";

import { AuthHeader } from "@/components/auth/auth-header";
import { Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/danke.png";

export function MainHeader() {
  const pathname = usePathname();
  const hideOnBoardView = !!pathname && /^\/boards\/[^/]+$/.test(pathname);

  if (hideOnBoardView) {
    return null;
  }

  return (
    <header className="fixed top-4 z-50 px-4 w-full">
      <div className="relative max-w-7xl mx-auto">
        {/* Thumbtack */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
        </div>
        <div className="bg-white border-4 border-gray-900 shadow-2xl rounded-sm px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-black text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
              <Image
                src={logo}
                alt="Danke"
                width={24}
                height={24}
                className="w-7 h-7 brightness-0 invert"
              />
            </div>
            <span className="tracking-tight font-fuzzy-bubbles">Danke</span>
          </Link>
          <AuthHeader />
        </div>
      </div>
    </header>
  );
}
