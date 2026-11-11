"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type DashboardStats = {
  orders: number;
  pendingOrders: number;
  reservations: number;
  pendingReservations: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>({
    orders: 0,
    pendingOrders: 0,
    reservations: 0,
    pendingReservations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      try {
        const token = await user.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };

        const [ordersResponse, reservationsResponse] =
          await Promise.all([
            fetch("/api/orders", { headers }),
            fetch("/api/reservations", { headers }),
          ]);

        if (
          [ordersResponse.status, reservationsResponse.status].some(
            (status) => status === 401 || status === 403
          )
        ) {
          await signOut(auth);
          router.replace("/admin/login");
          return;
        }

        const [ordersResult, reservationsResult] =
          await Promise.all([
            ordersResponse.json(),
            reservationsResponse.json(),
          ]);

        if (!ordersResponse.ok) {
          throw new Error(
            ordersResult.message || "Could not load orders."
          );
        }

        if (!reservationsResponse.ok) {
          throw new Error(
            reservationsResult.message ||
              "Could not load reservations."
          );
        }

        const orders = ordersResult.orders ?? [];
        const reservations = reservationsResult.reservations ?? [];

        setStats({
          orders: orders.length,
          pendingOrders: orders.filter(
            (order: { status: string }) => order.status === "PENDING"
          ).length,
          reservations: reservations.length,
          pendingReservations: reservations.filter(
            (reservation: { status: string }) =>
              reservation.status === "PENDING"
          ).length,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage FastFoodie orders and reservations.
            </p>
          </div>

          <button
            onClick={async () => {
              await signOut(auth);
              router.replace("/admin/login");
            }}
            className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700"
          >
            Sign Out
          </button>
        </header>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg bg-red-50 p-4 text-red-700"
          >
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-8 text-gray-600">Loading dashboard...</p>
        ) : (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.orders}
                </p>
                <p className="mt-1 text-sm text-orange-600">
                  {stats.pendingOrders} pending
                </p>
                <button
                  onClick={() => router.push("/admin/orders")}
                  className="mt-4 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
                >
                  Manage Orders
                </button>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                  Total Reservations
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.reservations}
                </p>
                <p className="mt-1 text-sm text-orange-600">
                  {stats.pendingReservations} pending
                </p>
                <button
                  onClick={() =>
                    router.push("/admin/reservations")
                  }
                  className="mt-4 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
                >
                  Manage Reservations
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}