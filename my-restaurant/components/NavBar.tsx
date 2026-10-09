
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "Reservations", href: "/reservations" },
  { label: "Availability", href: "/availability" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/#contact") {
      return false;
    }

    return pathname === href ||
      (href !== "/" && pathname.startsWith(`${href}/`));
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Restaurant logo/name */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold text-orange-600"
        >
          <u className="text-gray-400">Fast</u>Foodie
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-medium transition hover:text-orange-600 ${
                isActive(link.href)
                  ? "text-orange-600"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop order button */}
        <Link
          href="/order"
          className="hidden rounded-lg bg-orange-600 px-4 py-2.5 font-semibold text-white transition hover:bg-orange-700 lg:inline-block"
        >
          Order Now
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
        >
          {isOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile links */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-6 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 font-medium transition hover:bg-orange-50 hover:text-orange-600 ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/order"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-lg bg-orange-600 px-5 py-3 text-center font-semibold text-white hover:bg-orange-700"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}