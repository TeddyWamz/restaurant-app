"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";


type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type FoodOrder = {
  id: string;
  customerName: string;
  phone: string;
  address: string | null;
  orderType: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [statusUpdateError, setStatusUpdateError] = useState("");
  const router = useRouter();

  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.replace("/admin/login");
      return;
    }

    try {
      const token = await user.getIdToken();

      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.status === 401 || response.status === 403) {
        await signOut(auth);
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Could not load orders.");
      }

      setOrders(result.orders);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading orders."
      );
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, [router]);

  
async function updateOrderStatus(id: string, status: string) {
  const user = auth.currentUser;

  if (!user) {
    router.replace("/admin/login");
    return;
  }

  setUpdatingOrderId(id);
  setError("");

  try {
    const token = await user.getIdToken();

    const response = await fetch("/api/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, status }),
    });

    const result = await response.json();

    if (response.status === 401 || response.status === 403) {
      await auth.signOut();
      router.replace("/admin/login");
      return;
    }

    if (!response.ok) {
      throw new Error(result.message || "Could not update order.");
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong while updating the order."
    );
  } finally {
    setUpdatingOrderId(null);
  }
}

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <p>Loading orders...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-bold">Orders Dashboard</h1>
        <p role="alert" className="mt-4 text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="bg-orange-600 px-6 py-14 text-center text-white w-full rounded-3xl">
        <h1 className="text-4xl font-bold text-white">
          Orders 
        </h1>

        <p className="mt-2 text-white">
          View customer orders and their details.
        </p>

        </section>

        {statusUpdateError && (
          <p role="alert" className="mt-4 text-red-600">
            {statusUpdateError}
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-blue-700">Total Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-600">{orders.length}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-600">
              {orders.filter((order) => order.status === "PENDING").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-green-700">Completed Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-600">
              {orders.filter((order) => order.status === "COMPLETED").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-red-700">Cancelled Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-600">
              {orders.filter((order) => order.status === "CANCELLED").length}
            </p>
          </div>
        </div>

        

        <section className="mt-8 space-y-5">
          {orders.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold">No orders yet</h2>
              <p className="mt-2 text-gray-600">
                New food orders will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h2 className="text-lg font-bold text-blue-500">
                      Order #{order.id.slice(-8)}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
  <label
    htmlFor={`status-${order.id}`}
    className="text-sm font-medium text-gray-600"
  >
    Order status
  </label>

  <select
    id={`status-${order.id}`}
    value={order.status}
    disabled={updatingOrderId === order.id}
    onChange={(event) =>
      updateOrderStatus(order.id, event.target.value)
    }
    className="rounded-lg border border-gray-300 bg-gray-400 px-3 py-2 text-sm disabled:opacity-60 text-white"
  >
    <option value="PENDING">Pending</option>
    <option value="CONFIRMED">Confirmed</option>
    <option value="PREPARING">Preparing</option>
    <option value="COMPLETED">Completed</option>
    <option value="CANCELLED">Cancelled</option>
  </select>

  {updatingOrderId === order.id && (
    <p className="text-xs text-gray-500">Updating status...</p>
  )}
</div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold text-red-500">Customer</h3>
                    <p className="mt-1 text-gray-500">{order.customerName}</p>
                    <p className="text-gray-600">📞 {order.phone}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-500">Order Type</h3>
                    <p className="mt-1 capitalize text-gray-500">{order.orderType}</p>

                    {order.address && (
                      <p className="mt-1 text-gray-600">
                        📍Delivery address: {order.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 border-t pt-4">
                  <h3 className="font-semibold text-gray-500">Items Ordered</h3>

                  <ul className="mt-3 space-y-2">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between gap-4 text-sm text-gray-500"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>

                        <span className="whitespace-nowrap">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex justify-between border-t pt-4 font-bold text-green-500">
                    <span>Total</span>
                    <span>KSh {order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}