
// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";

// type Reservation = {
//   id: string;
//   customerName: string;
//   email: string;
//   phone: string;
//   reservationDate: string;
//   reservationTime: string;
//   guests: number;
//   occasion: string;
//   status: string;
//   createdAt: string;
// };

// const statuses = [
//   "PENDING",
//   "CONFIRMED",
//   "CANCELLED",
//   "COMPLETED",
// ];

// export default function ReservationsDashboard() {
//   const router = useRouter();

//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         router.replace("/admin/login");
//         return;
//       }

//       try {
//         const token = await user.getIdToken();

//         const response = await fetch("/api/reservations", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await response.json();

//         if (response.status === 401 || response.status === 403) {
//           await signOut(auth);
//           router.replace("/admin/login");
//           return;
//         }

//         if (!response.ok) {
//           throw new Error(
//             result.message || "Unable to load reservations."
//           );
//         }

//         setReservations(result.reservations);
//         setError("");
//       } catch (error) {
//         setError(
//           error instanceof Error
//             ? error.message
//             : "Something went wrong."
//         );
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   async function updateStatus(id: string, status: string) {
//     const user = auth.currentUser;

//     if (!user) {
//       router.replace("/admin/login");
//       return;
//     }

//     setUpdatingId(id);
//     setError("");

//     try {
//       const token = await user.getIdToken();

//       const response = await fetch("/api/reservations", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id, status }),
//       });

//       const result = await response.json();

//       if (response.status === 401 || response.status === 403) {
//         await signOut(auth);
//         router.replace("/admin/login");
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(
//           result.message || "Unable to update reservation."
//         );
//       }

//       setReservations((current) =>
//         current.map((reservation) =>
//           reservation.id === id
//             ? { ...reservation, status }
//             : reservation
//         )
//       );
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Unable to update reservation."
//       );
//     } finally {
//       setUpdatingId(null);
//     }
//   }

//   async function handleSignOut() {
//     await signOut(auth);
//     router.replace("/admin/login");
//   }

//   if (loading) {
//     return <main className="p-8">Loading reservations...</main>;
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
//       <div className="mx-auto max-w-6xl">
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Reservations
//             </h1>
//             <p className="mt-2 text-gray-600">
//               Review and manage table booking requests.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push("/admin/orders")}
//               className="rounded-lg border border-gray-300 bg-gray-400 px-4 py-2 font-medium text-white"
//             >
//               View Orders
//             </button>

//             <button
//               onClick={handleSignOut}
//               className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Total reservations</p>
//           <p className="mt-1 text-3xl font-bold text-gray-600">
//             {reservations.length}
//           </p>
//         </div>

//         {error && (
//           <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">
//             {error}
//           </p>
//         )}

//         <section className="mt-6 space-y-4">
//           {reservations.length === 0 ? (
//             <div className="rounded-xl bg-white p-8 text-center shadow-sm">
//               No reservations have been submitted yet.
//             </div>
//           ) : (
//             reservations.map((reservation) => (
//               <article
//                 key={reservation.id}
//                 className="rounded-xl bg-white p-5 shadow-sm"
//               >
//                 <div className="flex flex-col justify-between gap-4 sm:flex-row">
//                   <div>
//                     <h2 className="text-lg font-bold text-gray-900">
//                       {reservation.customerName}
//                     </h2>

//                     <p className="mt-1 text-sm text-gray-600 ">
//                       {reservation.email} · {reservation.phone}
//                     </p>

//                     <br />

//                     <div className="rounded-xl bg-white p-4 shadow-sm">

//                     <p className="mt-3 text-gray-400">
//                       <strong>Date:</strong>{" "}
//                       {reservation.reservationDate.slice(0, 10)}
//                     </p>

//                     <p className="text-gray-400">
//                       <strong>Time:</strong>{" "}
//                       {reservation.reservationTime}
//                     </p>

//                     <p className="text-gray-400">
//                       <strong>Guests:</strong> {reservation.guests}
//                     </p>

//                     <p className="text-gray-400">
//                       <strong>Occasion:</strong> {reservation.occasion}
//                     </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col gap-2 sm:min-w-48">
//                     <label
//                       htmlFor={`reservation-${reservation.id}`}
//                       className="text-sm font-medium text-gray-600"
//                     >
//                       Reservation status
//                     </label>

//                     <select
//                       id={`reservation-${reservation.id}`}
//                       value={reservation.status}
//                       disabled={updatingId === reservation.id}
//                       onChange={(event) =>
//                         updateStatus(reservation.id, event.target.value)
//                       }
//                       className="rounded-lg border border-gray-300 bg-gray-300 px-3 py-2 disabled:opacity-60 text-white"
//                     >
//                       {statuses.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>

//                     {updatingId === reservation.id && (
//                       <p className="text-xs text-gray-500">
//                         Saving status...
//                       </p>
//                     )}
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

type Status = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type Reservation = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  occasion: string;
  status: Status;
  createdAt: string;
};

const STATUS_STYLE: Record<Status, { label: string; badge: string; border: string }> = {
  PENDING:   { label: "Pending",   badge: "bg-amber-100 text-amber-800", border: "border-l-amber-500" },
  CONFIRMED: { label: "Confirmed", badge: "bg-blue-100 text-blue-800",   border: "border-l-blue-500" },
  COMPLETED: { label: "Completed", badge: "bg-green-100 text-green-800", border: "border-l-green-500" },
  CANCELLED: { label: "Cancelled", badge: "bg-red-100 text-red-800",     border: "border-l-red-500" },
};

const NEXT_STEP: Partial<Record<Status, { to: Status; label: string; negative: string }>> = {
  PENDING:   { to: "CONFIRMED", label: "Confirm",        negative: "Decline" },
  CONFIRMED: { to: "COMPLETED", label: "Mark completed", negative: "Cancel" },
};

const TABS = [
  { key: "UPCOMING",  label: "Upcoming",     match: (r: Reservation, today: string) => (r.status === "PENDING" || r.status === "CONFIRMED") && dateKey(r) >= today },
  { key: "PENDING",   label: "Needs action", match: (r: Reservation) => r.status === "PENDING" },
  { key: "PAST",      label: "Past",         match: (r: Reservation, today: string) => r.status === "COMPLETED" || (r.status !== "CANCELLED" && dateKey(r) < today) },
  { key: "CANCELLED", label: "Cancelled",    match: (r: Reservation) => r.status === "CANCELLED" },
  { key: "ALL",       label: "All",          match: () => true },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const POLL_MS = 20_000;

function dateKey(r: Reservation) {
  return r.reservationDate.slice(0, 10);
}

function localDateString(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(key: string, days: number) {
  const d = new Date(`${key}T00:00:00`);
  d.setDate(d.getDate() + days);
  return localDateString(d);
}

function dayLabel(key: string, today: string) {
  const pretty = new Date(`${key}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  if (key === today) return `Today · ${pretty}`;
  if (key === addDays(today, 1)) return `Tomorrow · ${pretty}`;
  return pretty;
}

export default function ReservationsDashboard() {
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("UPCOMING");
  const [query, setQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [today, setToday] = useState("");

  const handleAuthError = useCallback(async () => {
    await signOut(auth);
    router.replace("/admin/login");
  }, [router]);

  // Load + poll (paused while the tab is hidden)
  useEffect(() => {
    let cancelled = false;

    async function tick() {
  try {
    const data = await adminFetch<{ reservations: Reservation[] }>("/api/reservations");
    if (cancelled) return;
    setReservations(data.reservations);
    setLoadError("");
  } catch (err) {
    if (cancelled) return;
    if (err instanceof AuthError) {
      await handleAuthError();
      return;
    }
    setLoadError(err instanceof Error ? err.message : "Could not load reservations.");
  } finally {
    if (!cancelled) {
      setToday(localDateString());
      setLoading(false);
    }
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
    const c = { pending: 0, upcoming: 0, todayBookings: 0, todayGuests: 0 };
    for (const r of reservations) {
      if (r.status === "PENDING") c.pending++;
      if (TABS[0].match(r, today)) c.upcoming++;
      if (dateKey(r) === today && (r.status === "PENDING" || r.status === "CONFIRMED")) {
        c.todayBookings++;
        c.todayGuests += r.guests;
      }
    }
    return c;
  }, [reservations, today]);

  // Pending count in the browser tab title
  useEffect(() => {
    document.title = counts.pending > 0 ? `(${counts.pending}) Reservations` : "Reservations";
  }, [counts.pending]);

  const groups = useMemo(() => {
    const match = TABS.find((t) => t.key === tab)!.match;
    const q = query.trim().toLowerCase();
    const descending = tab === "PAST" || tab === "CANCELLED";

    const filtered = reservations.filter(
      (r) =>
        match(r, today) &&
        (!q ||
          r.customerName.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q))
    );

    filtered.sort((a, b) => {
      const cmp = `${dateKey(a)} ${a.reservationTime}`.localeCompare(`${dateKey(b)} ${b.reservationTime}`);
      return descending ? -cmp : cmp;
    });

    const map = new Map<string, Reservation[]>();
    for (const r of filtered) {
      const key = dateKey(r);
      map.set(key, [...(map.get(key) ?? []), r]);
    }
    return Array.from(map.entries());
  }, [reservations, tab, query, today]);

  async function updateStatus(id: string, status: Status) {
    const previous = reservations;
    setUpdatingId(id);
    setActionError("");
    // optimistic update, rolled back on failure
    setReservations((cur) => cur.map((r) => (r.id === id ? { ...r, status } : r)));

    try {
      await adminFetch("/api/reservations", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      setReservations(previous);
      if (err instanceof AuthError) return handleAuthError();
      setActionError(err instanceof Error ? err.message : "Could not update the reservation.");
    } finally {
      setUpdatingId(null);
    }
  }

  function decline(r: Reservation, label: string) {
    if (confirm(`${label} the booking for ${r.customerName}? This can't be undone.`)) {
      updateStatus(r.id, "CANCELLED");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-sm text-gray-600">Updates automatically every {POLL_MS / 1000}s.</p>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, phone or email"
          aria-label="Search reservations"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 sm:w-72"
        />
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Needs action" value={counts.pending} accent="text-amber-700" onClick={() => setTab("PENDING")} />
        <Stat label="Upcoming" value={counts.upcoming} accent="text-blue-700" onClick={() => setTab("UPCOMING")} />
        <Stat label="Bookings today" value={counts.todayBookings} accent="text-gray-900" onClick={() => setTab("UPCOMING")} />
        <Stat label="Guests today" value={counts.todayGuests} accent="text-orange-700" onClick={() => setTab("UPCOMING")} />
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
        <p className="mt-8 text-gray-600">Loading reservations…</p>
      ) : loadError && reservations.length === 0 ? (
        <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-red-700">{loadError}</p>
          <button
            onClick={() => {
              setLoading(true);
              setRefreshKey((k) => k + 1);
            }}
            className="mt-3 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
          >
            Try again
          </button>
        </div>
      ) : groups.length === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">No reservations here</h2>
          <p className="mt-1 text-gray-600">New bookings will appear automatically.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {loadError && (
            <p className="text-sm text-amber-700">Couldn’t refresh just now. Showing the last loaded reservations.</p>
          )}

          {groups.map(([key, items]) => {
            const guestTotal = items
              .filter((r) => r.status !== "CANCELLED")
              .reduce((sum, r) => sum + r.guests, 0);

            return (
              <section key={key}>
                <h2 className="flex flex-wrap items-baseline gap-x-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                  {dayLabel(key, today)}
                  <span className="text-xs font-medium normal-case tracking-normal text-gray-500">
                    {items.length} booking{items.length === 1 ? "" : "s"} · {guestTotal} guests
                  </span>
                </h2>

                <div className="mt-3 space-y-3">
                  {items.map((r) => {
                    const next = NEXT_STEP[r.status];
                    const busy = updatingId === r.id;

                    return (
                      <article
                        key={r.id}
                        className={`rounded-xl border-l-4 bg-white p-5 shadow-sm ${STATUS_STYLE[r.status].border}`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="min-w-16 rounded-lg bg-orange-50 px-3 py-2 text-center">
                              <p className="text-lg font-bold text-orange-700">{r.reservationTime}</p>
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900">{r.customerName}</h3>
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[r.status].badge}`}>
                                  {STATUS_STYLE[r.status].label}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-700">
                                <span className="font-semibold">{r.guests}</span> guest{r.guests === 1 ? "" : "s"}
                                {r.occasion && <> · {r.occasion}</>}
                              </p>
                            </div>
                          </div>

                          {next && (
                            <div className="flex w-full gap-2 sm:w-auto">
                              <button
                                disabled={busy}
                                onClick={() => updateStatus(r.id, next.to)}
                                className="flex-1 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60 sm:flex-none"
                              >
                                {busy ? "Saving…" : next.label}
                              </button>
                              <button
                                disabled={busy}
                                onClick={() => decline(r, next.negative)}
                                className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60 sm:flex-none"
                              >
                                {next.negative}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-gray-100 pt-3 text-sm">
                          <a href={`tel:${r.phone}`} className="text-orange-700 hover:underline">
                            <span aria-hidden>📞</span> {r.phone}
                          </a>
                          <a href={`mailto:${r.email}`} className="break-all text-orange-700 hover:underline">
                            <span aria-hidden>✉️</span> {r.email}
                          </a>
                          <span className="text-gray-500">
                            Booked {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
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