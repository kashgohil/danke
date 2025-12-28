import { Github, Mail, Pin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import logo from "public/danke.png";

export function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="relative w-full">
        {/* Thumbtack */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
        </div>
        <div className="bg-white border-4 border-gray-900 shadow-2xl rounded-t-sm px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Image src={logo} alt="Danke.png" height={24} width={24} />
                  <span className="text-xl font-bold text-gray-900">Danke</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                  Create beautiful appreciation boards to celebrate moments,
                  share gratitude, and build stronger connections with your
                  community.
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link
                    href="mailto:hello@danke.app"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900">Company</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900">Resources</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/help"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/status"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Status
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900">Product</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/create-board"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Create Board
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/templates"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-12 pt-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600">
                    © 2024 Danke. All rights reserved.
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Privacy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Terms
                    </Link>
                    <Link
                      href="/cookies"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Cookies
                    </Link>
                    <div className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                      <span>
                        Made by{" "}
                        <a
                          href="https://kashoverflow.com"
                          className="hover:text-gray-900 transition-colors"
                        >
                          Kash
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
