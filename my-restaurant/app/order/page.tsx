
"use client";

import Navbar from "@/components/NavBar";
import { useState, type FormEvent } from "react";

const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken",
    description: "Grilled chicken served with potatoes and vegetables.",
    price: 850,
  },
  {
    id: 2,
    name: "Beef Burger",
    description: "Beef burger with lettuce, tomato and special sauce.",
    price: 650,
  },
  {
    id: 3,
    name: "Creamy Pasta",
    description: "Pasta prepared with a creamy sauce and fresh herbs.",
    price: 700,
  },
  {
    id: 4,
    name: "Chicken and Rice",
    description: "Chicken served with rice and fresh vegetables.",
    price: 600,
  },
  {
    id: 5,
    name: "Classic Cheeseburger",
    description: "Cheeseburger served with crispy fries.",
    price: 750,
  },
  {
    id: 6,
    name: "Pasta Special",
    description: "Our chef's special pasta with fresh ingredients.",
    price: 800,
  },
];

export default function Order() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const selectedItems = menuItems.filter(
    (item) => (quantities[item.id] ?? 0) > 0
  );

  const totalItems = selectedItems.reduce(
    (total, item) => total + quantities[item.id],
    0
  );

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * quantities[item.id],
    0
  );

  function updateQuantity(id: number, change: number) {
    setQuantities((current) => {
      const newQuantity = Math.max(0, (current[id] ?? 0) + change);

      return {
        ...current,
        [id]: newQuantity,
      };
    });

    setOrderPlaced(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedItems.length === 0) {
      alert("Please select at least one meal.");
      return;
    }

    setOrderPlaced(true);
  }

  return (
    


    <main className="min-h-screen bg-gray-50">
      {/* Page heading */}
      <section className="bg-orange-600 px-6 py-14 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Fresh food, made for you
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Place Your Order
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-orange-50">
          Choose your favourite meals, select quantities and
          review your order before submitting.
        </p>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3">
        {/* Menu selection */}
        <section className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Choose Your Meals
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {menuItems.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="font-bold text-orange-600">
                    KSh {item.price.toLocaleString("en-KE")}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!quantities[item.id]}
                      aria-label={`Remove one ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400 bg-gray-600 text-lg disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="min-w-5 text-center font-semibold text-gray-500">
                      {quantities[item.id] ?? 0}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Add one ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-lg text-white hover:bg-orange-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Order summary and customer form */}
        <aside className="h-fit rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Order
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"} selected
          </p>

          <div className="my-5 space-y-4 border-y border-gray-200 py-5">
            {selectedItems.length === 0 ? (
              <p className="text-sm text-gray-500">
                Your order is empty. Add a meal to get started.
              </p>
            ) : (
              selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-gray-500">
                      {quantities[item.id]} × KSh {item.price}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    KSh{" "}
                    {(item.price * quantities[item.id]).toLocaleString(
                      "en-KE"
                    )}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-400">
            <span>Total</span>
            <span className="text-orange-600">
              KSh {totalPrice.toLocaleString("en-KE")}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Customer Details
            </h3>

            <div>
              <label
                htmlFor="customerName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="customerName"
                type="text"
                autoComplete="name"
                required
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-600"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="e.g. 0712345678"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-600"
              />
            </div>

            <div>
              <label
                htmlFor="orderType"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Order Type
              </label>

              <select
                id="orderType"
                value={orderType}
                onChange={(event) => setOrderType(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 text-gray-500"
              >
                <option value="delivery">Home Delivery</option>
                <option value="pickup">Restaurant Pickup</option>
              </select>
            </div>

            {orderType === "delivery" && (
              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  autoComplete="street-address"
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Enter your delivery location"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-600"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={selectedItems.length === 0}
              className="w-full rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Order
            </button>
          </form>

          {orderPlaced && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              <h3 className="font-bold">Order preview created!</h3>

              <p className="mt-2">
                Thank you, {customerName}. Your selected meals total KSh{" "}
                {totalPrice.toLocaleString("en-KE")}.
              </p>

              <p className="mt-2">
                {orderType === "delivery"
                  ? `Delivery address: ${address}`
                  : "You selected restaurant pickup."}
              </p>

              <p className="mt-2">
                This is a demo confirmation. Your order has not been sent
                to the restaurant.
              </p>
            </div>
          )}
        </aside>
      </div>
    </main>

    
  );
}