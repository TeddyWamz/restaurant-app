
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type TrackedOrder = {
  referenceCode: string;
  customerName: string;
  orderType: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
};

type TrackingCredentials = {
  referenceCode: string;
  lookupCode: string;
};

const orderStages = [
  { status: "PENDING", label: "Order received" },
  { status: "CONFIRMED", label: "Order confirmed" },
  { status: "PREPARING", label: "Preparing your food" },
  { status: "COMPLETED", label: "Order completed" },
];

const statusLabels: Record<string, string> = {
  PENDING: "Order received",
  CONFIRMED: "Order confirmed",
  PREPARING: "Preparing your food",
  COMPLETED: "Order completed",
  CANCELLED: "Order cancelled",
};

export default function OrderStatusPage() {
  const [referenceCode, setReferenceCode] = useState("");
  const [lookupCode, setLookupCode] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [credentials, setCredentials] =
    useState<TrackingCredentials | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setOrder(null);
    setCredentials(null);
    setLastChecked(null);

    const submittedCredentials = {
      referenceCode: referenceCode.trim().toUpperCase(),
      lookupCode: lookupCode.trim().toUpperCase(),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedCredentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to find your order."
        );
      }

      setOrder(data.order);
      setCredentials(submittedCredentials);
      setLastChecked(new Date());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Refresh the order status every 15 seconds.
  useEffect(() => {
    if (!order || !credentials) {
      return;
    }

    let inFlight = false;

    async function refreshOrder() {
      if (
        document.visibilityState !== "visible" ||
        inFlight
      ) {
        return;
      }

      inFlight = true;

      try {
        const response = await fetch("/api/orders", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.order) {
          setOrder(data.order);
          setLastChecked(new Date());
        }
      } catch {
        // Keep the last successful result if a refresh fails.
      } finally {
        inFlight = false;
      }
    }

    const intervalId = window.setInterval(
      refreshOrder,
      15000
    );

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void refreshOrder();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [order !== null, credentials]);

  const currentStageIndex = order
    ? orderStages.findIndex(
        (stage) => stage.status === order.status
      )
    : -1;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Track Your Order
          </h1>

          <p className="mt-2 text-gray-600">
            Enter the two codes you received when placing your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="referenceCode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Order reference code
            </label>

            <input
              id="referenceCode"
              value={referenceCode}
              onChange={(event) =>
                setReferenceCode(event.target.value)
              }
              placeholder="ORD-XXXXXXXXXX"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <div>
            <label
              htmlFor="lookupCode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Private lookup code
            </label>

            <input
              id="lookupCode"
              value={lookupCode}
              onChange={(event) =>
                setLookupCode(event.target.value)
              }
              placeholder="Enter your private code"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Checking order..." : "Check order status"}
          </button>
        </form>

        {order && (
          <section
            aria-live="polite"
            className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">
                  Order reference
                </p>

                <h2 className="text-xl font-bold text-blue-700">
                  {order.referenceCode}
                </h2>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  order.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : order.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {statusLabels[order.status] ?? order.status}
              </span>
            </div>

            {order.status === "CANCELLED" ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <h3 className="font-bold text-red-800">
                  This order has been cancelled
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  Please contact the restaurant if you need more
                  information.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="mb-5 font-bold text-gray-900">
                  Order progress
                </h3>

                <div className="space-y-0">
                  {orderStages.map((stage, index) => {
                    const isComplete =
                      currentStageIndex >= index;
                    const isCurrent =
                      currentStageIndex === index;

                    return (
                      <div
                        key={stage.status}
                        className="flex gap-3"
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                              isComplete
                                ? "bg-green-600 text-white"
                                : "border-2 border-gray-300 bg-white text-gray-400"
                            }`}
                          >
                            {isComplete ? "✓" : index + 1}
                          </div>

                          {index < orderStages.length - 1 && (
                            <div
                              className={`my-1 min-h-8 w-0.5 flex-1 ${
                                currentStageIndex > index
                                  ? "bg-green-600"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>

                        <div className="pb-6">
                          <p
                            className={`font-semibold ${
                              isCurrent
                                ? "text-amber-700"
                                : isComplete
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          >
                            {stage.label}
                          </p>

                          {isCurrent && (
                            <p className="mt-1 text-sm text-gray-500">
                              Current status
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {currentStageIndex === -1 && (
                  <p className="text-sm text-gray-500">
                    Your order has an unfamiliar status. Please
                    contact the restaurant for clarification.
                  </p>
                )}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium text-gray-900">
                  {order.customerName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order type</p>
                <p className="font-medium capitalize text-gray-900">
                  {order.orderType}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date placed</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-gray-700">
                Your items
              </h3>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex justify-between gap-4 border-b border-gray-100 pb-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium text-green-700">
                      KSh{" "}
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-KE")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-green-700">
              <span>Total</span>
              <span>
                KSh {order.totalAmount.toLocaleString("en-KE")}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Status refreshes automatically every 15 seconds
                while this page is open.
              </p>

              {lastChecked && (
                <p className="mt-1 text-xs text-gray-400">
                  Last updated: {lastChecked.toLocaleTimeString()}
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
