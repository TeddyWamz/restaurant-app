"use client";

import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      const token = user && (await user.getIdTokenResult());
      if (!user || token?.claims.admin !== true) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });
  }, [router]);

  if (!ready) return <p className="p-8 text-gray-600">Checking access…</p>;

  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium ${
        pathname.startsWith(href)
          ? "bg-orange-100 text-orange-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-3">
        <nav className="flex gap-2">
          {link("/admin/orders", "Orders")}
          {link("/admin/reservations", "Reservations")}
        </nav>
        <button
          onClick={async () => {
            await signOut(auth);
            router.replace("/admin/login");
          }}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Sign out
        </button>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}