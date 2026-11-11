
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import type { FormEvent } from "react";


// const menuItems = [
//   {
//     id: 1,
//     name: "Grilled Chicken",
//     description: "Grilled chicken served with potatoes and vegetables.",
//     price: 850,
//   },
//   {
//     id: 2,
//     name: "Beef Burger",
//     description: "Beef burger with lettuce, tomato and special sauce.",
//     price: 650,
//   },
//   {
//     id: 3,
//     name: "Creamy Pasta",
//     description: "Pasta prepared with a creamy sauce and fresh herbs.",
//     price: 700,
//   },
//   {
//     id: 4,
//     name: "Chicken and Rice",
//     description: "Chicken served with rice and fresh vegetables.",
//     price: 600,
//   },
//   {
//     id: 5,
//     name: "Classic Cheeseburger",
//     description: "Cheeseburger served with crispy fries.",
//     price: 750,
//   },
//   {
//     id: 6,
//     name: "Pasta Special",
//     description: "Our chef's special pasta with fresh ingredients.",
//     price: 800,
//   },
// ];

// type OrderTracking = {
//   referenceCode: string;
//   lookupCode: string;
// };

// export default function Order() {
//   const [quantities, setQuantities] = useState<Record<number, number>>({});
//   const [customerName, setCustomerName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [orderType, setOrderType] = useState("delivery");
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(
//     null
//   );
//   const [orders, setOrders] = useState<
//   { id: string; status: string }[]
// >([]);
  

//   const selectedItems = menuItems.filter(
//     (item) => (quantities[item.id] ?? 0) > 0
//   );

//   const totalItems = selectedItems.reduce(
//     (total, item) => total + quantities[item.id],
//     0
//   );

//   const totalPrice = selectedItems.reduce(
//     (total, item) => total + item.price * quantities[item.id],
//     0
//   );

//   const [tracking, setTracking] = useState<OrderTracking | null>(null);

//   function updateQuantity(id: number, change: number) {
//     setQuantities((current) => {
//       const newQuantity = Math.max(0, (current[id] ?? 0) + change);

//       return {
//         ...current,
//         [id]: newQuantity,
//       };
//     });

//     setOrderPlaced(false);
//   }

  

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault();

//   if (selectedItems.length === 0) {
//     setErrorMessage("Please select at least one meal.");
//     return;
//   }

//   if (submitting) return;

//   setSubmitting(true);
//   setErrorMessage("");
//   setOrderPlaced(false);

// setTracking(null);

//   try {
//     const response = await fetch("/api/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         customerName,
//         phone,
//         address: orderType === "delivery" ? address : null,
//         orderType,
//         items: selectedItems.map((item) => ({
//           id: item.id,
//           quantity: quantities[item.id],
//         })),
//       }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(
//         result.message || "Unable to save your order."
//       );
//     }

//     if (
//     !result.tracking?.referenceCode ||
//     !result.tracking?.lookupCode
//   ) {
//     throw new Error(
//       "Your order was saved, but tracking codes were not returned."
//     );
//   }
//   setTracking(result.tracking);
//   setOrderPlaced(true);

//     setOrderPlaced(true);
//   } catch (error) {
//     setErrorMessage(
//       error instanceof Error
//         ? error.message
//         : "Something went wrong. Please try again."
//     );
//   } finally {
//     setSubmitting(false);
//   }
// }

// async function updateOrderStatus(id: string, status: string) {
//   setUpdatingOrderId(id);
//   setErrorMessage("");

//   try {
//     const response = await fetch("/api/orders", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, status }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || "Could not update order.");
//     }

//     setOrders((currentOrders) =>
//       currentOrders.map((order) =>
//         order.id === id ? { ...order, status } : order
//       )
//     );
//   } catch (error) {
//     setErrorMessage(
//       error instanceof Error
//         ? error.message
//         : "Something went wrong while updating the order."
//     );
//   } finally {
//     setUpdatingOrderId(null);
//   }
// }

//   return (
    


//     <main className="min-h-screen bg-gray-50">
//       {/* Page heading */}
//       <section className="bg-orange-600 px-6 py-14 text-center text-white">
//         <p className="text-sm font-semibold uppercase tracking-widest">
//           Fresh food, made for you
//         </p>

//         <h1 className="mt-3 text-4xl font-bold md:text-5xl">
//           Place Your Order
//         </h1>

//         <p className="mx-auto mt-4 max-w-xl text-orange-50">
//           Choose your favourite meals, select quantities and
//           review your order before submitting.
//         </p>
//       </section>

//       <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3">
//         {/* Menu selection */}
//         <section className="lg:col-span-2">
//           <h2 className="mb-6 text-2xl font-bold text-gray-900">
//             Choose Your Meals
//           </h2>

//           <div className="grid gap-5 sm:grid-cols-2">
//             {menuItems.map((item) => (
//               <article
//                 key={item.id}
//                 className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <h3 className="font-bold text-gray-900">
//                       {item.name}
//                     </h3>

//                     <p className="mt-2 text-sm leading-6 text-gray-600">
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5 flex items-center justify-between gap-3">
//                   <p className="font-bold text-orange-600">
//                     KSh {item.price.toLocaleString("en-KE")}
//                   </p>

//                   <div className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       onClick={() => updateQuantity(item.id, -1)}
//                       disabled={!quantities[item.id]}
//                       aria-label={`Remove one ${item.name}`}
//                       className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-400 bg-gray-600 text-lg disabled:cursor-not-allowed disabled:opacity-40"
//                     >
//                       −
//                     </button>

//                     <span className="min-w-5 text-center font-semibold text-gray-500">
//                       {quantities[item.id] ?? 0}
//                     </span>

//                     <button
//                       type="button"
//                       onClick={() => updateQuantity(item.id, 1)}
//                       aria-label={`Add one ${item.name}`}
//                       className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-lg text-white hover:bg-orange-700"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* Order summary and customer form */}
//         <aside className="h-fit rounded-2xl bg-white p-6 shadow-md">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Your Order
//           </h2>

//           <p className="mt-2 text-sm text-gray-500">
//             {totalItems} {totalItems === 1 ? "item" : "items"} selected
//           </p>

//           <div className="my-5 space-y-4 border-y border-gray-200 py-5">
//             {selectedItems.length === 0 ? (
//               <p className="text-sm text-gray-500">
//                 Your order is empty. Add a meal to get started.
//               </p>
//             ) : (
//               selectedItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between gap-3 text-sm"
//                 >
//                   <div>
//                     <p className="font-medium text-gray-800">
//                       {item.name}
//                     </p>
//                     <p className="mt-1 text-gray-500">
//                       {quantities[item.id]} × KSh {item.price}
//                     </p>
//                   </div>

//                   <p className="font-semibold text-gray-900">
//                     KSh{" "}
//                     {(item.price * quantities[item.id]).toLocaleString(
//                       "en-KE"
//                     )}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="flex justify-between text-lg font-bold text-gray-400">
//             <span>Total</span>
//             <span className="text-orange-600">
//               KSh {totalPrice.toLocaleString("en-KE")}
//             </span>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-7 space-y-4">
//             <h3 className="text-lg font-bold text-gray-900">
//               Customer Details
//             </h3>

//             <div>
//               <label
//                 htmlFor="customerName"
//                 className="mb-1 block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>

//               <input
//                 id="customerName"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={customerName}
//                 onChange={(event) => setCustomerName(event.target.value)}
//                 placeholder="Enter your full name"
//                 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-600"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="phone"
//                 className="mb-1 block text-sm font-medium text-gray-700"
//               >
//                 Phone Number
//               </label>

//               <input
//                 id="phone"
//                 type="tel"
//                 autoComplete="tel"
//                 required
//                 value={phone}
//                 onChange={(event) => setPhone(event.target.value)}
//                 placeholder="e.g. 0712345678"
//                 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-600"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="orderType"
//                 className="mb-1 block text-sm font-medium text-gray-700"
//               >
//                 Order Type
//               </label>

//               <select
//                 id="orderType"
//                 value={orderType}
//                 onChange={(event) => setOrderType(event.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 text-gray-500"
//               >
//                 <option value="delivery">Home Delivery</option>
//                 <option value="pickup">Restaurant Pickup</option>
//               </select>
//             </div>

//             {orderType === "delivery" && (
//               <div>
//                 <label
//                   htmlFor="address"
//                   className="mb-1 block text-sm font-medium text-gray-700"
//                 >
//                   Delivery Address
//                 </label>

//                 <textarea
//                   id="address"
//                   autoComplete="street-address"
//                   required
//                   value={address}
//                   onChange={(event) => setAddress(event.target.value)}
//                   placeholder="Enter your delivery location"
//                   rows={3}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-gray-600"
//                 />
//               </div>
//             )}

//             <button
//              type="submit"
//              disabled={submitting}
//              className="w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
//            >
//              {submitting ? "Placing Order..." : "Place Order"}
//            </button>

//            <div className="mt-6 text-center">
//       <Link
//         href="/order-status"
//         className="inline-block rounded-lg bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
//       >
//         Check Order Status
//       </Link>
//     </div>
//           </form>

//           {errorMessage && (
//               <div
//                 role="alert"
//                 className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
//               >
//                 {errorMessage}
//               </div>
//             )}

//           {orderPlaced && tracking && (
//   <div
//     role="status"
//     className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-900"
//   >
//     <h3 className="text-lg font-bold">
//       Order placed successfully!
//     </h3>

//     <p className="mt-2">
//       Thank you, {customerName}. Your order has been saved.
//     </p>

//     <div className="mt-4 space-y-3 rounded-lg border border-green-200 bg-white p-4">
//       <div>
//         <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//           Order reference code
//         </p>
//         <p className="mt-1 break-all font-bold text-gray-900">
//           {tracking.referenceCode}
//         </p>
//       </div>

//       <div>
//         <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//           Private lookup code
//         </p>
//         <p className="mt-1 break-all font-bold text-gray-900">
//           {tracking.lookupCode}
//         </p>
//       </div>

//       <button
//         type="button"
//         onClick={() => {
//           void navigator.clipboard.writeText(
//             `Order reference: ${tracking.referenceCode}\nPrivate lookup code: ${tracking.lookupCode}`
//           );
//         }}
//         className="w-full rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
//       >
//         Copy tracking codes
//       </button>
//     </div>

//     <p className="mt-3">
//       Save both codes somewhere safe. You&apos;ll need them to check your order status.
//     </p>

//     <a
//       href="/order-status"
//       className="mt-4 block w-full rounded-lg bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700"
//     >
//       Track My Order
//     </a>
//   </div>
// )}
//         </aside>
//       </div>
//     </main>

    
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import CopyButton from "@/components/CopyButton";

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

const MAX_PER_ITEM = 20;
const PHONE_PATTERN = /^(\+?254|0)[17]\d{8}$/;

const ORDER_TYPES = [
  { value: "delivery", label: "Home delivery" },
  { value: "pickup", label: "Restaurant pickup" },
] as const;

type OrderType = (typeof ORDER_TYPES)[number]["value"];

type OrderTracking = {
  referenceCode: string;
  lookupCode: string;
};

// Snapshot taken at submit time, so the cart can be cleared right away
type PlacedOrder = {
  tracking: OrderTracking;
  customerName: string;
  orderType: OrderType;
  total: number;
  lines: { name: string; quantity: number; lineTotal: number }[];
};

const formatKsh = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const copyButtonClass = `shrink-0 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 ${focusRing}`;

export default function Order() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const successRef = useRef<HTMLHeadingElement>(null);

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

  // Bring the confirmation into view and announce it to screen readers
  useEffect(() => {
    if (placed) {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [placed]);

  function setQuantity(id: number, quantity: number) {
    setQuantities((current) => ({
      ...current,
      [id]: Math.min(MAX_PER_ITEM, Math.max(0, quantity)),
    }));
    setErrorMessage("");
  }

  function startNewOrder() {
    setPlaced(null);
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (selectedItems.length === 0) {
      setErrorMessage("Please add at least one meal to your order.");
      return;
    }

    const normalizedPhone = phone.replace(/[\s-]/g, "");
    if (!PHONE_PATTERN.test(normalizedPhone)) {
      setErrorMessage("Please enter a valid phone number, e.g. 0712345678.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: normalizedPhone,
          address: orderType === "delivery" ? address.trim() : null,
          orderType,
          items: selectedItems.map((item) => ({
            id: item.id,
            quantity: quantities[item.id],
          })),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Unable to save your order.");
      }

      if (!result?.tracking?.referenceCode || !result?.tracking?.lookupCode) {
        throw new Error(
          "Your order was saved, but the tracking codes were not returned. Please contact the restaurant before ordering again."
        );
      }

      setPlaced({
        tracking: result.tracking,
        customerName: customerName.trim(),
        orderType,
        total: totalPrice,
        lines: selectedItems.map((item) => ({
          name: item.name,
          quantity: quantities[item.id],
          lineTotal: item.price * quantities[item.id],
        })),
      });
      setQuantities({});
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Page heading */}
      <section className="bg-orange-600 px-6 py-12 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Fresh food, made for you
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Place Your Order</h1>
        <p className="mx-auto mt-4 max-w-xl text-orange-50">
          Choose your favourite meals, then enter your details and place your
          order.
        </p>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3">
        {/* Menu selection (inert and dimmed once an order is placed) */}
        <section
          aria-label="Menu"
          inert={placed !== null}
          className={`lg:col-span-2 ${placed ? "opacity-50" : ""}`}
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Choose Your Meals
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {menuItems.map((item) => {
              const quantity = quantities[item.id] ?? 0;

              return (
                <article
                  key={item.id}
                  className={`flex flex-col rounded-xl border bg-white p-5 shadow-sm transition ${
                    quantity > 0
                      ? "border-orange-400 ring-1 ring-orange-200"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="font-bold text-orange-600">
                      {formatKsh(item.price)}
                    </p>

                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, 1)}
                        aria-label={`Add ${item.name} to order`}
                        className={`rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700 ${focusRing}`}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, quantity - 1)}
                          aria-label={`Remove one ${item.name}`}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-lg text-gray-700 hover:bg-gray-50 ${focusRing}`}
                        >
                          −
                        </button>

                        <span
                          aria-live="polite"
                          className="min-w-6 text-center font-semibold text-gray-900"
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, quantity + 1)}
                          disabled={quantity >= MAX_PER_ITEM}
                          aria-label={`Add one ${item.name}`}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-lg text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Order summary + customer form, or the confirmation once placed */}
        <aside
          id="your-order"
          className="h-fit scroll-mt-24 rounded-2xl bg-white p-6 shadow-md lg:sticky lg:top-24"
        >
          {placed ? (
            <div role="status">
              <div className="text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700"
                >
                  ✓
                </div>
                <h2
                  ref={successRef}
                  tabIndex={-1}
                  className="mt-4 text-2xl font-bold text-gray-900 focus:outline-none"
                >
                  Order placed!
                </h2>
                <p className="mt-2 text-gray-600">
                  Thank you, {placed.customerName}. We’ve received your{" "}
                  {placed.orderType === "delivery" ? "delivery" : "pickup"}{" "}
                  order.
                </p>
              </div>

              <ul className="my-5 space-y-2 border-y border-gray-200 py-4 text-sm">
                {placed.lines.map((line) => (
                  <li
                    key={line.name}
                    className="flex justify-between gap-3 text-gray-700"
                  >
                    <span>
                      {line.quantity} × {line.name}
                    </span>
                    <span className="whitespace-nowrap font-medium text-gray-900">
                      {formatKsh(line.lineTotal)}
                    </span>
                  </li>
                ))}
                <li className="flex justify-between pt-2 text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-orange-600">
                    {formatKsh(placed.total)}
                  </span>
                </li>
              </ul>

              <div className="space-y-4 rounded-xl bg-gray-50 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Order reference code
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="break-all font-mono font-bold text-gray-900">
                      {placed.tracking.referenceCode}
                    </p>
                    <CopyButton
                      text={placed.tracking.referenceCode}
                      label="order reference code"
                      className={copyButtonClass}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Private lookup code
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="break-all font-mono font-bold text-gray-900">
                      {placed.tracking.lookupCode}
                    </p>
                    <CopyButton
                      text={placed.tracking.lookupCode}
                      label="private lookup code"
                      className={copyButtonClass}
                    />
                  </div>
                </div>

                <CopyButton
                  text={`Order reference: ${placed.tracking.referenceCode}\nPrivate lookup code: ${placed.tracking.lookupCode}`}
                  label="both tracking codes"
                  className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${focusRing}`}
                >
                  Copy both codes
                </CopyButton>
              </div>

              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                Save both codes somewhere safe. You’ll need them to check your
                order status, and the private code won’t be shown again.
              </p>

              <Link
                href="/order-status"
                className={`mt-4 block w-full rounded-lg bg-orange-600 px-4 py-3 text-center font-semibold text-white hover:bg-orange-700 ${focusRing}`}
              >
                Track my order
              </Link>

              <button
                type="button"
                onClick={startNewOrder}
                className={`mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 ${focusRing}`}
              >
                Place another order
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
              <p className="mt-2 text-sm text-gray-600">
                {totalItems} {totalItems === 1 ? "item" : "items"} selected
              </p>

              <ul className="my-5 space-y-4 border-y border-gray-200 py-5">
                {selectedItems.length === 0 ? (
                  <li className="text-sm text-gray-600">
                    Your order is empty. Add a meal to get started.
                  </li>
                ) : (
                  selectedItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="mt-1 text-gray-600">
                          {quantities[item.id]} × {formatKsh(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-gray-900">
                          {formatKsh(item.price * quantities[item.id])}
                        </p>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, 0)}
                          aria-label={`Remove ${item.name} from order`}
                          className={`rounded p-1 text-gray-400 hover:text-red-600 ${focusRing}`}
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>

              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-orange-600">{formatKsh(totalPrice)}</span>
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
                    className={inputClass}
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
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="e.g. 0712345678"
                    className={inputClass}
                  />
                </div>

                <fieldset>
                  <legend className="mb-1 block text-sm font-medium text-gray-700">
                    How would you like your order?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {ORDER_TYPES.map((option) => (
                      <label
                        key={option.value}
                        className={`cursor-pointer rounded-lg border px-3 py-3 text-center text-sm font-semibold transition focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 ${
                          orderType === option.value
                            ? "border-orange-600 bg-orange-50 text-orange-700"
                            : "border-gray-300 text-gray-700 hover:border-orange-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value={option.value}
                          checked={orderType === option.value}
                          onChange={() => setOrderType(option.value)}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

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
                      placeholder="Building, street, area or landmark"
                      rows={3}
                      className={inputClass}
                    />
                  </div>
                )}

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  >
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || selectedItems.length === 0}
                  className={`w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                >
                  {submitting
                    ? "Placing order…"
                    : totalPrice > 0
                      ? `Place order · ${formatKsh(totalPrice)}`
                      : "Place order"}
                </button>

                {selectedItems.length === 0 && (
                  <p className="text-center text-sm text-gray-500">
                    Add at least one meal to continue.
                  </p>
                )}

                <p className="text-center text-sm">
                  <Link
                    href="/order-status"
                    className="font-medium text-orange-700 hover:underline"
                  >
                    Already ordered? Check your order status
                  </Link>
                </p>
              </form>
            </>
          )}
        </aside>
      </div>

      {/* Mobile bar: jumps to the summary so it isn't lost below the menu */}
      {totalItems > 0 && !placed && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur lg:hidden">
          <a
            href="#your-order"
            className={`flex items-center justify-between rounded-lg bg-orange-600 px-5 py-3.5 font-semibold text-white ${focusRing}`}
          >
            <span>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
            <span>Review order · {formatKsh(totalPrice)}</span>
          </a>
        </div>
      )}
    </main>
  );
}