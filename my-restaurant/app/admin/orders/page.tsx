// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";



// type OrderItem = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// type FoodOrder = {
//   id: string;
//   customerName: string;
//   phone: string;
//   address: string | null;
//   orderType: string;
//   totalAmount: number;
//   status: string;
//   createdAt: string;
//   items: OrderItem[];
// };

// export default function OrdersDashboard() {
//   const [orders, setOrders] = useState<FoodOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
//   const [statusUpdateError, setStatusUpdateError] = useState("");
//   const router = useRouter();

  
// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//       router.replace("/admin/login");
//       return;
//     }

//     try {
//       const token = await user.getIdToken();

//       const response = await fetch("/api/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await response.json();

//       if (response.status === 401 || response.status === 403) {
//         await signOut(auth);
//         router.replace("/admin/login");
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(result.message || "Could not load orders.");
//       }

//       setOrders(result.orders);
//       setError("");
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Something went wrong while loading orders."
//       );
//     } finally {
//       setLoading(false);
//     }
//   });

//   return () => unsubscribe();
// }, [router]);

  
// async function updateOrderStatus(id: string, status: string) {
//   const user = auth.currentUser;

//   if (!user) {
//     router.replace("/admin/login");
//     return;
//   }

//   setUpdatingOrderId(id);
//   setError("");

//   try {
//     const token = await user.getIdToken();

//     const response = await fetch("/api/orders", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ id, status }),
//     });

//     const result = await response.json();

//     if (response.status === 401 || response.status === 403) {
//       await auth.signOut();
//       router.replace("/admin/login");
//       return;
//     }

//     if (!response.ok) {
//       throw new Error(result.message || "Could not update order.");
//     }

//     setOrders((currentOrders) =>
//       currentOrders.map((order) =>
//         order.id === id ? { ...order, status } : order
//       )
//     );
//   } catch (error) {
//     setError(
//       error instanceof Error
//         ? error.message
//         : "Something went wrong while updating the order."
//     );
//   } finally {
//     setUpdatingOrderId(null);
//   }
// }

//   if (loading) {
//     return (
//       <main className="min-h-screen p-8">
//         <p>Loading orders...</p>
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="min-h-screen p-8">
//         <h1 className="text-2xl font-bold">Orders Dashboard</h1>
//         <p role="alert" className="mt-4 text-red-600">
//           {error}
//         </p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
//       <div className="mx-auto max-w-6xl">
// <div className="flex flex-wrap gap-3 justify-end">
//   <button
//     onClick={() => router.push("/admin/reservations")}
//     className="rounded-lg border border-gray-300 bg-gray-400 px-4 py-2 font-medium"
//   >
//     View Reservations
//   </button>

//   <button
//     onClick={async () => {
//       await signOut(auth);
//       router.replace("/admin/login");
//     }}
//     className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white"
//   >
//     Sign Out
//   </button>
// </div>
// <br />
//         <section className="bg-orange-600 px-6 py-14 text-center text-white w-full rounded-3xl">
//         <h1 className="text-4xl font-bold text-white">
//           Orders 
//         </h1>

//         <p className="mt-2 text-white">
//           View customer orders and their details.
//         </p>



//         </section>

//         {statusUpdateError && (
//           <p role="alert" className="mt-4 text-red-600">
//             {statusUpdateError}
//           </p>
//         )}

//         <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
//           <div className="rounded-xl bg-white p-5 shadow-sm">
//             <div className="rounded-xl bg-blue-700 p-3 shadow-sm">
//             <p className="text-sm text-white">Total Orders</p>
//             </div>

//             <br />

//             <div className="rounded-xl bg-white p-3 shadow-lg ">
//             <p className="mt-2 text-3xl font-bold text-gray-600">{orders.length}</p>
//             </div>
//           </div>

//           <div className="rounded-xl bg-white p-5 shadow-sm">
//             <div className="rounded-xl bg-gray-700 p-3 shadow-sm">
//             <p className="text-sm text-white">Pending Orders</p>
//             </div>

//             <br />

//             <div className="rounded-xl bg-white p-3 shadow-lg ">
//             <p className="mt-2 text-3xl font-bold text-gray-600">
//               {orders.filter((order) => order.status === "PENDING").length}
//             </p>
//             </div>
//           </div>

//           <div className="rounded-xl bg-white p-5 shadow-sm">
//             <div className="rounded-xl bg-green-700 p-3 shadow-sm">
//             <p className="text-sm text-white">Completed Orders</p>
//             </div>
            
//             <br />

//             <div className="rounded-xl bg-white p-3 shadow-lg ">
//             <p className="mt-2 text-3xl font-bold text-gray-600">
//               {orders.filter((order) => order.status === "COMPLETED").length}
//             </p>
//             </div>
//           </div>

//           <div className="rounded-xl bg-white p-5 shadow-sm">
//             <div className="rounded-xl bg-red-700 p-3 shadow-sm">
//             <p className="text-sm text-white">Cancelled Orders</p>
//             </div>

//             <br />

//             <div className="rounded-xl bg-white p-3 shadow-lg ">
//             <p className="mt-2 text-3xl font-bold text-gray-600">
//               {orders.filter((order) => order.status === "CANCELLED").length}
//             </p>
//             </div>
//           </div>
//         </div>

        

//         <section className="mt-8 space-y-5">
//           {orders.length === 0 ? (
//             <div className="rounded-xl bg-white p-8 text-center shadow-sm">
//               <h2 className="text-xl font-semibold">No orders yet</h2>
//               <p className="mt-2 text-gray-600">
//                 New food orders will appear here.
//               </p>
//             </div>
//           ) : (
//             orders.map((order) => (
//               <article
//                 key={order.id}
//                 className="rounded-xl bg-white p-5 shadow-sm sm:p-6"
//               >
//                 <div className="flex flex-col justify-between gap-3 sm:flex-row">
//                   <div>
//                     <h2 className="text-lg font-bold text-blue-500">
//                       Order #{order.id.slice(-8)}
//                     </h2>

//                     <p className="mt-1 text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="flex flex-col gap-2">
//   <label
//     htmlFor={`status-${order.id}`}
//     className="text-sm font-medium text-gray-600"
//   >
//     Order status
//   </label>

//   <select
//     id={`status-${order.id}`}
//     value={order.status}
//     disabled={updatingOrderId === order.id}
//     onChange={(event) =>
//       updateOrderStatus(order.id, event.target.value)
//     }
//     className="rounded-lg border border-gray-300 bg-gray-400 px-3 py-2 text-sm disabled:opacity-60 text-white"
//   >
//     <option value="PENDING">Pending</option>
//     <option value="CONFIRMED">Confirmed</option>
//     <option value="PREPARING">Preparing</option>
//     <option value="COMPLETED">Completed</option>
//     <option value="CANCELLED">Cancelled</option>
//   </select>

//   {updatingOrderId === order.id && (
//     <p className="text-xs text-gray-500">Updating status...</p>
//   )}
// </div>
//                 </div>

//                 <div className="mt-5 grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <h3 className="font-semibold text-red-500">Customer</h3>
//                     <p className="mt-1 text-gray-500">{order.customerName}</p>
//                     <p className="text-gray-600">📞 {order.phone}</p>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-red-500">Order Type</h3>
//                     <p className="mt-1 capitalize text-gray-500">{order.orderType}</p>

//                     {order.address && (
//                       <p className="mt-1 text-gray-600">
//                         📍Delivery address: {order.address}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-5 border-t pt-4">
//                   <h3 className="font-semibold text-gray-500">Items Ordered</h3>

//                   <ul className="mt-3 space-y-2">
//                     {order.items.map((item) => (
//                       <li
//                         key={item.id}
//                         className="flex justify-between gap-4 text-sm text-gray-500"
//                       >
//                         <span>
//                           {item.name} × {item.quantity}
//                         </span>

//                         <span className="whitespace-nowrap">
//                           KSh {(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-4 flex justify-between border-t pt-4 font-bold text-green-500">
//                     <span>Total</span>
//                     <span>KSh {order.totalAmount.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </article>
//             ))
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }


"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { adminFetch, AuthError } from "@/lib/adminFetch";

type Status = "PENDING" | "CONFIRMED" | "PREPARING" | "COMPLETED" | "CANCELLED";

type OrderItem = { id: string; name: string; price: number; quantity: number };
type FoodOrder = {
  id: string;
  customerName: string;
  phone: string;
  address: string | null;
  orderType: string;
  totalAmount: number;
  status: Status;
  createdAt: string;
  items: OrderItem[];
};

const STATUS_STYLE: Record<Status, { label: string; badge: string }> = {
  PENDING:   { label: "Pending",   badge: "bg-amber-100 text-amber-800" },
  CONFIRMED: { label: "Confirmed", badge: "bg-blue-100 text-blue-800" },
  PREPARING: { label: "Preparing", badge: "bg-purple-100 text-purple-800" },
  COMPLETED: { label: "Completed", badge: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelled", badge: "bg-red-100 text-red-800" },
};

const NEXT_STEP: Partial<Record<Status, { to: Status; label: string }>> = {
  PENDING:   { to: "CONFIRMED", label: "Confirm order" },
  CONFIRMED: { to: "PREPARING", label: "Start preparing" },
  PREPARING: { to: "COMPLETED", label: "Mark completed" },
};

const TABS = [
  { key: "ACTIVE",    label: "Active",    match: (s: Status) => ["PENDING", "CONFIRMED", "PREPARING"].includes(s) },
  { key: "COMPLETED", label: "Completed", match: (s: Status) => s === "COMPLETED" },
  { key: "CANCELLED", label: "Cancelled", match: (s: Status) => s === "CANCELLED" },
  { key: "ALL",       label: "All",       match: () => true },
] as const;

const POLL_MS = 15_000;

function minutesAgo(iso: string) {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
}

export default function OrdersDashboard() {
  const router = useRouter();

  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");      // can replace the list
  const [actionError, setActionError] = useState("");  // banner only
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("ACTIVE");
  const [query, setQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAuthError = useCallback(async () => {
    await signOut(auth);
    router.replace("/admin/login");
  }, [router]);

  const load = useCallback(async () => {
    try {
      const data = await adminFetch<{ orders: FoodOrder[] }>("/api/orders");
      setOrders(data.orders);
      setLoadError("");
    } catch (err) {
      if (err instanceof AuthError) return handleAuthError();
      setLoadError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  // Initial load + polling (paused while the tab is hidden)
 useEffect(() => {
  let cancelled = false;

  async function tick() {
    try {
      const data = await adminFetch<{ orders: FoodOrder[] }>("/api/orders");
      if (cancelled) return;
      setOrders(data.orders);
      setLoadError("");
    } catch (err) {
      if (cancelled) return;
      if (err instanceof AuthError) {
        await handleAuthError();
        return;
      }
      setLoadError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  tick();
  const id = setInterval(() => {
    if (document.visibilityState === "visible") tick();
  }, POLL_MS);

  return () => {
    cancelled = true;
    clearInterval(id);
  };
}, [handleAuthError, refreshKey]);

  const counts = useMemo(() => {
    const c = { total: orders.length, pending: 0, active: 0, completed: 0, cancelled: 0 };
    for (const o of orders) {
      if (o.status === "PENDING") c.pending++;
      if (TABS[0].match(o.status)) c.active++;
      if (o.status === "COMPLETED") c.completed++;
      if (o.status === "CANCELLED") c.cancelled++;
    }
    return c;
  }, [orders]);

  // Show pending count in the browser tab so staff notice new orders
  useEffect(() => {
    document.title = counts.pending > 0 ? `(${counts.pending}) Orders` : "Orders";
  }, [counts.pending]);

  const visible = useMemo(() => {
    const match = TABS.find((t) => t.key === tab)!.match;
    const q = query.trim().toLowerCase();
    return orders.filter(
      (o) =>
        match(o.status) &&
        (!q ||
          o.customerName.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.id.toLowerCase().includes(q))
    );
  }, [orders, tab, query]);

  async function updateStatus(id: string, status: Status) {
    const previous = orders;
    setUpdatingId(id);
    setActionError("");
    // optimistic update, rolled back on failure
    setOrders((cur) => cur.map((o) => (o.id === id ? { ...o, status } : o)));

    try {
      await adminFetch("/api/orders", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      setOrders(previous);
      if (err instanceof AuthError) return handleAuthError();
      setActionError(err instanceof Error ? err.message : "Could not update the order.");
    } finally {
      setUpdatingId(null);
    }
  }

  function cancelOrder(order: FoodOrder) {
    if (confirm(`Cancel order for ${order.customerName}? This can't be undone.`)) {
      updateStatus(order.id, "CANCELLED");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-600">Updates automatically every {POLL_MS / 1000}s.</p>
        </div>

        <button
                  onClick={() =>
                    router.push("/admin/reservations")
                  }
                  className="mt-4 rounded-lg bg-orange-600 px-4 py-2 font-small text-white hover:bg-orange-700"
                >
                  Manage Reservations
                </button>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, phone or order #"
          aria-label="Search orders"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 sm:w-72"
        />
      </header>

      {/* Stats double as filters */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Needs action" value={counts.pending} accent="text-amber-700" onClick={() => setTab("ACTIVE")} />
        <Stat label="Active" value={counts.active} accent="text-blue-700" onClick={() => setTab("ACTIVE")} />
        <Stat label="Completed" value={counts.completed} accent="text-green-700" onClick={() => setTab("COMPLETED")} />
        <Stat label="Cancelled" value={counts.cancelled} accent="text-red-700" onClick={() => setTab("CANCELLED")} />
      </div>

      <div role="tablist" className="mt-6 flex gap-2 overflow-x-auto border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium ${
              tab === t.key
                ? "border-orange-600 text-orange-700"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {actionError && (
        <div role="alert" className="mt-4 flex items-start justify-between gap-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <span>{actionError}</span>
          <button onClick={() => setActionError("")} aria-label="Dismiss" className="font-bold">×</button>
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-gray-600">Loading orders…</p>
      ) : loadError && orders.length === 0 ? (
        <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-red-700">{loadError}</p>
          <button onClick={load} className="mt-3 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700">
            Try again
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">No orders here</h2>
          <p className="mt-1 text-gray-600">New orders will appear automatically.</p>
        </div>
      ) : (
        <section className="mt-6 space-y-4">
          {loadError && (
            <p className="text-sm text-amber-700">Couldn’t refresh just now. Showing the last loaded orders.</p>
          )}
          {visible.map((order) => {
            const next = NEXT_STEP[order.status];
            const age = minutesAgo(order.createdAt);
            const late = order.status === "PENDING" && age >= 10;
            const busy = updatingId === order.id;

            return (
              <article
                key={order.id}
                className={`rounded-xl bg-white p-5 shadow-sm sm:p-6 ${late ? "ring-2 ring-amber-400" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-900">#{order.id.slice(-8)}</h2>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[order.status].badge}`}>
                        {STATUS_STYLE[order.status].label}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-700">
                        {order.orderType}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString()} · {age < 1 ? "just now" : `${age} min ago`}
                      {late && <span className="ml-2 font-semibold text-amber-700">Waiting a while</span>}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {next && (
                      <button
                        disabled={busy}
                        onClick={() => updateStatus(order.id, next.to)}
                        className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
                      >
                        {busy ? "Updating…" : next.label}
                      </button>
                    )}
                    {next && (
                      <button
                        disabled={busy}
                        onClick={() => cancelOrder(order)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">Customer</h3>
                    <p className="mt-1 text-gray-700">{order.customerName}</p>
                    <a href={`tel:${order.phone}`} className="text-orange-700 hover:underline">
                      <span aria-hidden>📞</span> {order.phone}
                    </a>
                  </div>
                  {order.address && (
                    <div>
                      <h3 className="font-semibold text-gray-900">Delivery address</h3>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-orange-700 hover:underline"
                      >
                        <span aria-hidden>📍</span> {order.address}
                      </a>
                    </div>
                  )}
                </div>

                <ul className="mt-4 divide-y divide-gray-100 border-t pt-2 text-sm">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-4 py-2 text-gray-700">
                      <span>{item.quantity} × {item.name}</span>
                      <span className="whitespace-nowrap">KSh {(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                  <li className="flex justify-between pt-3 font-bold text-gray-900">
                    <span>Total</span>
                    <span>KSh {order.totalAmount.toLocaleString()}</span>
                  </li>
                </ul>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

function Stat({ label, value, accent, onClick }: { label: string; value: number; accent: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-xl bg-white p-4 text-left shadow-sm hover:shadow-md">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent}`}>{value}</p>
    </button>
  );
}