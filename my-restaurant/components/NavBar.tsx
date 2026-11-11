
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";


// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Menu", href: "/menu" },
//   // { label: "Order", href: "/order" },
//   { label: "Reservations", href: "/reservations" },
//   { label: "Availability", href: "/availability" },
//   { label: "Contact", href: "/#contact" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [orderMenuOpen, setOrderMenuOpen] = useState(false);
//   const pathname = usePathname();

//   function isActive(href: string) {
//     if (href === "/#contact") {
//       return false;
//     }

//     return pathname === href ||
//       (href !== "/" && pathname.startsWith(`${href}/`));
//   }



//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         {/* Restaurant logo/name */}
//         <Link
//           href="/"
//           onClick={() => setIsOpen(false)}
//           className="text-2xl font-bold text-orange-600"
//         >
//           <u className="text-gray-400">Fast</u>Foodie
//         </Link>

//         {/* Desktop links */}
//         <div className="hidden items-center gap-5 lg:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               aria-current={isActive(link.href) ? "page" : undefined}
//               className={`font-medium transition hover:text-orange-600 ${
//                 isActive(link.href)
//                   ? "text-orange-600"
//                   : "text-gray-700"
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* Desktop order button */}
//         <Link
//           href="/order"
//           className="hidden rounded-lg bg-orange-600 px-4 py-2.5 font-semibold text-white transition hover:bg-orange-700 lg:inline-block"
//         >
//           Order Now
//         </Link>

//         {/* Mobile menu toggle */}
//         <button
//           type="button"
//           aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
//           aria-expanded={isOpen}
//           onClick={() => setIsOpen((open) => !open)}
//           className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
//         >
//           {isOpen ? (
//             <span className="text-2xl">✕</span>
//           ) : (
//             <span className="text-2xl">☰</span>
//           )}
//         </button>
//       </div>

//       {/* Mobile links */}
//       {isOpen && (
//         <div className="border-t border-gray-100 bg-white px-6 pb-5 pt-3 lg:hidden">
//           <div className="flex flex-col gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.label}
//                 href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 aria-current={isActive(link.href) ? "page" : undefined}
//                 className={`rounded-md px-3 py-3 font-medium transition hover:bg-orange-50 hover:text-orange-600 ${
//                   isActive(link.href)
//                     ? "bg-orange-50 text-orange-600"
//                     : "text-gray-700"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             <Link
//               href="/order"
//               onClick={() => setIsOpen(false)}
//               className="mt-2 rounded-lg bg-orange-600 px-5 py-3 text-center font-semibold text-white hover:bg-orange-700"
//             >
//               Order Now
//             </Link>


//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MOTTO = "Fresh, fast, and made with love"; // <- put your restaurant's motto here

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Availability", href: "/availability" },
  { label: "Contact", href: "/#contact" },
];

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

export default function Navbar() {
  const pathname = usePathname();

  // The menu counts as open only on the page where it was opened, so it
  // closes automatically on any navigation (links, back button, etc.).
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;

  const closeMenu = () => setOpenedAt(null);
  const toggleMenu = () => setOpenedAt(isOpen ? null : pathname);

  // Close on Escape while the menu is open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenedAt(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function isActive(href: string) {
    if (href === "/#contact") return false;
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-orange-700 focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Tap-outside backdrop */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Logo (left) */}
          <Link
            href="/"
            className={`justify-self-start rounded-md text-2xl font-extrabold tracking-tight ${focusRing}`}
          >
            <span className="text-gray-900">Fast</span>
            <span className="text-orange-600">Foodie</span>
          </Link>

          {/* Motto (center, tablet and up) */}
          <p className="hidden text-center text-base font-medium italic text-gray-600 md:block">
            {MOTTO}
          </p>

          {/* Actions (right) */}
          <div className="flex items-center gap-2 justify-self-end">
            <Link
              href="/order"
              className={`rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 active:scale-95 sm:text-base ${focusRing}`}
            >
              Order Now
            </Link>

            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="site-menu"
              onClick={toggleMenu}
              className={`flex items-center gap-2 rounded-md p-2 font-medium text-gray-700 hover:bg-gray-100 ${focusRing}`}
            >
              {/* <span className="hidden sm:inline">Menu</span> */}
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu panel: full width on mobile, dropdown card on tablet/desktop */}
        <div
          id="site-menu"
          inert={!isOpen}
          className={`absolute inset-x-0 top-full border-b border-gray-100 bg-white shadow-lg transition-[opacity,transform,visibility] duration-200 ease-out md:inset-x-auto md:right-6 md:mt-2 md:w-72 md:rounded-xl md:border ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 p-3">
            {/* Motto shown here on phones, where the center slot is hidden */}
            <p className="px-3 pb-2 pt-1 text-sm italic text-gray-500 md:hidden">
              {MOTTO}
            </p>

            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 font-medium transition-colors ${focusRing} ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}



