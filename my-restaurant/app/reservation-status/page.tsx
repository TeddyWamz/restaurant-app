
"use client";

import { useState } from "react";
import Link from "next/link";

type ReservationResult = {
  referenceCode: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  occasion: string;
  status: string;
};

export default function ReservationStatusPage() {
  const [referenceCode, setReferenceCode] = useState("");
  const [lookupCode, setLookupCode] = useState("");
  const [reservation, setReservation] =
    useState<ReservationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setReservation(null);

    try {
      const response = await fetch(
        "/api/reservations/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referenceCode,
            lookupCode,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not find your reservation."
        );
      }

      setReservation(result.reservation);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyle(status: string) {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            Reservation Support
          </p>

          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
            Check Your Reservation
          </h1>

          <p className="mt-3 text-stone-600">
            Enter the reference number and private lookup
            code you received when making your reservation.
          </p>
        </div>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="referenceCode"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Reservation Reference
              </label>

              <input
                id="referenceCode"
                type="text"
                value={referenceCode}
                onChange={(event) =>
                  setReferenceCode(event.target.value.toUpperCase())
                }
                placeholder="e.g. RES-A1B2C3D4E5F6"
                required
                autoComplete="off"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="lookupCode"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Private Lookup Code
              </label>

              <input
                id="lookupCode"
                type="password"
                value={lookupCode}
                onChange={(event) =>
                  setLookupCode(event.target.value.toUpperCase())
                }
                placeholder="Enter your private code"
                required
                autoComplete="off"
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100 text-gray-900"
              />

              <p className="mt-2 text-xs text-stone-500">
                Keep this code private. You need both codes to
                access your reservation details.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Checking Reservation..."
                : "Check Reservation Status"}
            </button>
          </form>
        </section>

        {reservation && (
          <section
            aria-live="polite"
            className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-stone-900">
                Reservation Details
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                  reservation.status
                )}`}
              >
                {reservation.status}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                <span className="text-stone-500">Reference</span>
                <span className="text-right font-semibold text-stone-900">
                  {reservation.referenceCode}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                <span className="text-stone-500">Date</span>
                <span className="text-right font-medium text-stone-900">
                  {reservation.reservationDate}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                <span className="text-stone-500">Time</span>
                <span className="text-right font-medium text-stone-900">
                  {reservation.reservationTime}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                <span className="text-stone-500">Guests</span>
                <span className="text-right font-medium text-stone-900">
                  {reservation.guests}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-stone-500">Occasion</span>
                <span className="text-right font-medium text-stone-900">
                  {reservation.occasion}
                </span>
              </div>
            </div>

            {reservation.status.toUpperCase() === "PENDING" && (
              <p className="mt-6 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
                Your reservation request is awaiting confirmation
                from the restaurant.
              </p>
            )}

            {reservation.status.toUpperCase() === "CONFIRMED" && (
              <p className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                Your reservation is confirmed. We look forward
                to welcoming you!
              </p>
            )}

            {reservation.status.toUpperCase() === "CANCELLED" && (
              <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                This reservation has been cancelled. Please
                contact the restaurant if you need assistance.
              </p>
            )}
          </section>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/reservations"
            className="font-medium text-amber-800 hover:underline"
          >
            Make a new reservation
          </Link>

          <span className="mx-3 text-stone-300">|</span>

          <Link
            href="/"
            className="font-medium text-stone-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
