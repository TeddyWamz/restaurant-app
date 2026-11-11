
// "use client";

// import Navbar from "@/components/NavBar";
// import Link from "next/link";
// import { useEffect, useRef, useState, type FormEvent } from "react";



// type ReservationResult = {
//   referenceCode: string;
//   lookupCode: string;
//   customerName: string;
//   reservationDate: string;
//   reservationTime: string;
//   guests: number;
//   status: string;
// };

// export default function ReservationsPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [guests, setGuests] = useState("2");
//   const [occasion, setOccasion] = useState("Regular Dining");
//   const [submitted, setSubmitted] = useState(false);
//   const [reservationCodes, setReservationCodes] = useState<{
//     referenceCode: string;
//     lookupCode: string;
//     status: string;
//   } | null>(null);
//   const [submitting, setSubmitting] = useState(false);
// const [errorMessage, setErrorMessage] = useState("");
//   const dateInputRef = useRef<HTMLInputElement>(null);
  
// const [reservationResult, setReservationResult] =
//   useState<ReservationResult | null>(null);

  


//   useEffect(() => {
//     const dateInput = dateInputRef.current;
//     if (!dateInput) return;

//     const today = new Date();
//     dateInput.min = [
//       today.getFullYear(),
//       String(today.getMonth() + 1).padStart(2, "0"),
//       String(today.getDate()).padStart(2, "0"),
//     ].join("-");
//   }, []);

  
// async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//   event.preventDefault();

//   setSubmitted(false);
//   setErrorMessage("");

//   if (submitting) return;

//   setSubmitting(true);

//   try {
//     const response = await fetch("/api/reservations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         phone,
//         date,
//         time,
//         guests,
//         occasion,
//       }),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(
//         result.message || "Unable to submit your reservation."
//       );
//     }

//     if (!result.reservation?.referenceCode || !result.reservation?.lookupCode) {
//   throw new Error(
//     "Your reservation was submitted, but the confirmation codes were not returned. Please contact the restaurant before submitting another booking."
//   );
// }

//     setReservationResult(result.reservation);
//     setReservationCodes({
//       referenceCode: result.reservation.referenceCode,
//       lookupCode: result.reservation.lookupCode,
//       status: result.reservation.status,
//     });
//     setSubmitted(true);
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

//   return (
    
    
//     <main className="min-h-screen bg-gray-50">
//       {/* Page heading */}
//       <section className="bg-orange-600 px-6 py-16 text-center text-white">
//         <p className="text-sm font-semibold uppercase tracking-widest">
//           Your table awaits
//         </p>

//         <h1 className="mt-3 text-4xl font-bold md:text-5xl">
//           Reserve a Table
//         </h1>

//         <p className="mx-auto mt-4 max-w-2xl text-orange-50">
//           Planning a family dinner, a date or a special celebration?
//           Book your table and let us prepare for your visit.
//         </p>
//       </section>

//       {/* Reservation form */}
//       <section className="mx-auto max-w-3xl px-6 py-14">
//         <div className="rounded-2xl bg-white p-6 shadow-md sm:p-10">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Reservation Details
//           </h2>

//           <p className="mt-2 text-gray-600">
//             Fill in the form below with your preferred booking details.
//           </p>

//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             {/* Customer name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="mb-2 block text-sm font-semibold text-gray-700"
//               >
//                 Full Name
//               </label>

//               <input
//                 id="name"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={name}
//                 onChange={(event) => {
//                   setName(event.target.value);
//                   setSubmitted(false);
//                   setErrorMessage("");
//                 }}
//                 placeholder="Enter your full name"
//                 className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             {/* Email and phone */}
//             <div className="grid gap-6 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Email Address
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(event) => {
//                     setEmail(event.target.value);
//                     setSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                   placeholder="you@example.com"
//                   className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Phone Number
//                 </label>

//                 <input
//                   id="phone"
//                   type="tel"
//                   autoComplete="tel"
//                   required
//                   value={phone}
//                   onChange={(event) => {
//                     setPhone(event.target.value);
//                     setSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                   placeholder="e.g. 0712345678"
//                   className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 />
//               </div>
//             </div>

//             {/* Date and time */}
//             <div className="grid gap-6 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="date"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Reservation Date
//                 </label>

//                 <input
//                   id="date"
//                   type="date"
//                   ref={dateInputRef}
//                   required
//                   value={date}
//                   onChange={(event) => {
//                     setDate(event.target.value);
//                     setSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                   className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="time"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Preferred Time
//                 </label>

//                 <select
//                   id="time"
//                   required
//                   value={time}
//                   onChange={(event) => {
//                     setTime(event.target.value);
//                     setSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                   className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 >
//                   <option value="">Select a time</option>
//                   <option value="11:00">11:00 AM</option>
//                   <option value="12:00">12:00 PM</option>
//                   <option value="13:00">1:00 PM</option>
//                   <option value="14:00">2:00 PM</option>
//                   <option value="15:00">3:00 PM</option>
//                   <option value="16:00">4:00 PM</option>
//                   <option value="17:00">5:00 PM</option>
//                   <option value="18:00">6:00 PM</option>
//                   <option value="19:00">7:00 PM</option>
//                   <option value="20:00">8:00 PM</option>
//                   <option value="21:00">9:00 PM</option>
//                 </select>
//               </div>
//             </div>

//             {/* Guests and occasion */}
//             <div className="grid gap-6 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="guests"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Number of Guests
//                 </label>

//                 <select
//                   id="guests"
//                   required
//                   value={guests}
//                   onChange={(event) => {
//                     setGuests(event.target.value);
//                     setSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                   className="w-full rounded-lg border border-gray-300 text-gray-500 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 >
//                   <option value="1">1 guest</option>
//                   <option value="2">2 guests</option>
//                   <option value="3">3 guests</option>
//                   <option value="4">4 guests</option>
//                   <option value="5">5 guests</option>
//                   <option value="6">6 guests</option>
//                   <option value="7">7 guests</option>
//                   <option value="8">8 guests</option>
//                   <option value="9">9 guests</option>
//                   <option value="10">10 guests</option>
//                 </select>
//               </div>

//               <div>
//                 <label
//                   htmlFor="occasion"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Occasion
//                 </label>

//                 <select
//                   id="occasion"
//                   value={occasion}
//                   onChange={(event) => {
//                     setOccasion(event.target.value);
//                     setSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                   className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500"
//                 >
//                   <option>Regular Dining</option>
//                   <option>Birthday</option>
//                   <option>Anniversary</option>
//                   <option>Business Meeting</option>
//                   <option>Family Gathering</option>
//                   <option>Other Celebration</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {submitting ? "Submitting..." : "Request Reservation"}
//             </button>

//                <Link
//                  href="/reservation-status"
//                  className="font-medium text-amber-800 hover:underline"
//                >
//                  Already made a reservation? Check your status
//                </Link>
//           </form>


//           {errorMessage && (
//             <div
//               role="alert"
//               className="mt-4 rounded-xl border border-red-200 bg-red-50 p-5 text-red-900"
//             >
//               <p className="text-sm">{errorMessage}</p>
//             </div>
//           )}

//           {/* Confirmation */}
//           {submitted && reservationCodes && (
//             // <div
//             //   role="status"
//             //   className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-green-900"
//             // >
//             //   <h3 className="text-lg font-bold">
//             //     Reservation Request Received
//             //   </h3>

//             //   <p className="mt-2">
//             //     Thank you, {name}! Here are your selected details:
//             //   </p>

//             //   <ul className="mt-3 space-y-2 text-sm">
//             //     <li>
//             //       <strong>Reference Code:</strong>{" "}
//             //       <span className="break-all font-mono">
//             //         {reservationCodes.referenceCode}
//             //       </span>
//             //     </li>
//             //     <li>
//             //       <strong>Lookup Code:</strong>{" "}
//             //       <span className="break-all font-mono">
//             //         {reservationCodes.lookupCode}
//             //       </span>
//             //     </li>
//             //     <li>
//             //       <strong>Date:</strong> {date}
//             //     </li>
//             //     <li>
//             //       <strong>Time:</strong>{" "}
//             //       {new Date(
//             //         `2000-01-01T${time}:00`
//             //       ).toLocaleTimeString("en-KE", {
//             //         hour: "numeric",
//             //         minute: "2-digit",
//             //         hour12: true,
//             //       })}
//             //     </li>
//             //     <li>
//             //       <strong>Guests:</strong> {guests}
//             //     </li>
//             //     <li>
//             //       <strong>Occasion:</strong> {occasion}
//             //     </li>
//             //     <li>
//             //       <strong>Contact:</strong> {phone} · {email}
//             //     </li>
//             //   </ul>

//             //   <p className="mt-4 text-sm">
//             //     Your reservation request has been received and is pending
//             //     confirmation. Keep your reference and lookup codes private.
//             //   </p>
//             // </div>
//           // )}

//            <section
//     aria-live="polite"
//     className="mt-8 rounded-2xl border border-green-200 bg-white p-6 shadow-sm"
//   >
//     <div className="text-center">
//       <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
//         ✓
//       </div>

//       <h2 className="text-2xl font-bold text-stone-900">
//         Reservation Submitted!
//       </h2>

//       <p className="mt-2 text-stone-600">
//         Thank you, {name}.
//         Your reservation request has been received.
//       </p>

//       <span className="mt-4 inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-800">
//         {reservationCodes.status}
//       </span>
//     </div>

//     <div className="mt-6 space-y-4 rounded-xl bg-stone-50 p-4">
//       <div>
//         <p className="text-sm text-stone-500">
//           Reservation Reference
//         </p>
//         <p className="mt-1 break-all font-bold text-stone-900">
//           {reservationCodes.referenceCode}
//         </p>
//         <button
//           type="button"
//           onClick={() =>
//             navigator.clipboard.writeText(
//               reservationCodes.referenceCode
//             )
//           }
//           className="mt-2 text-sm font-medium text-amber-800 hover:underline"
//         >
//           Copy reference
//         </button>
//       </div>

//       <div className="border-t border-stone-200 pt-4">
//         <p className="text-sm text-stone-500">
//           Private Lookup Code
//         </p>
//         <p className="mt-1 break-all font-bold tracking-wider text-stone-900">
//           {reservationCodes.lookupCode}
//         </p>
//         <button
//           type="button"
//           onClick={() =>
//             navigator.clipboard.writeText(
//               reservationCodes.lookupCode
//             )
//           }
//           className="mt-2 text-sm font-medium text-amber-800 hover:underline"
//         >
//           Copy lookup code
//         </button>
//       </div>
//     </div>

//     <p className="mt-4 text-sm text-red-700">
//       Important: Save both codes somewhere safe. The private
//       lookup code is needed to check your reservation status.
//       It will not be shown again after you leave this page.
//     </p>

//     <div className="mt-6 text-center">
//       <Link
//         href="/reservation-status"
//         className="inline-block rounded-lg bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
//       >
//         Check Reservation Status
//       </Link>
//     </div>
//   </section>

//         )}
//         </div>
//       </section>
//     </main>
    
//   );
// }

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import CopyButton from "@/components/CopyButton";

const TIME_SLOTS = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const OCCASIONS = [
  "Regular Dining",
  "Birthday",
  "Anniversary",
  "Business Meeting",
  "Family Gathering",
  "Other Celebration",
];

const MAX_GUESTS = 10;
const MAX_DAYS_AHEAD = 90;
const MIN_LEAD_MINUTES = 60;
const PHONE_PATTERN = /^(\+?254|0)[17]\d{8}$/;

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Awaiting confirmation",
  CONFIRMED: "Confirmed",
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  occasion: OCCASIONS[0],
};

type Confirmation = {
  referenceCode: string;
  lookupCode: string;
  status: string;
  name: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
};

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const copyButtonClass = `shrink-0 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 ${focusRing}`;

function toDateInputValue(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default function ReservationsPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const confirmationRef = useRef<HTMLHeadingElement>(null);

  // A callback ref runs every time the date input mounts, including after
  // "Make another reservation" brings the form back.
  const dateInputRef = useCallback((input: HTMLInputElement | null) => {
    if (!input) return;
    const today = new Date();
    const last = new Date(today);
    last.setDate(last.getDate() + MAX_DAYS_AHEAD);
    input.min = toDateInputValue(today);
    input.max = toDateInputValue(last);
  }, []);

  // Bring the confirmation into view and announce it to screen readers
  useEffect(() => {
    if (confirmation) {
      confirmationRef.current?.focus();
      confirmationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [confirmation]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrorMessage("");
  }

  function startAnother() {
    setConfirmation(null);
    // Keep the contact details, clear the booking details
    setForm((current) => ({
      ...initialForm,
      name: current.name,
      email: current.email,
      phone: current.phone,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const phone = form.phone.replace(/[\s-]/g, "");
    if (!PHONE_PATTERN.test(phone)) {
      setErrorMessage("Please enter a valid phone number, e.g. 0712345678.");
      return;
    }

    const slot = new Date(`${form.date}T${form.time}:00`);
    if (slot.getTime() < Date.now() + MIN_LEAD_MINUTES * 60_000) {
      setErrorMessage(
        "Please choose a time at least an hour from now, or call us for a same-hour booking."
      );
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone,
          date: form.date,
          time: form.time,
          guests: form.guests,
          occasion: form.occasion,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to submit your reservation."
        );
      }

      if (
        !result?.reservation?.referenceCode ||
        !result?.reservation?.lookupCode
      ) {
        throw new Error(
          "Your reservation was submitted, but the confirmation codes were not returned. Please contact the restaurant before submitting another booking."
        );
      }

      setConfirmation({
        referenceCode: result.reservation.referenceCode,
        lookupCode: result.reservation.lookupCode,
        status: result.reservation.status ?? "PENDING",
        name: form.name.trim(),
        date: form.date,
        time: form.time,
        guests: form.guests,
        occasion: form.occasion,
      });
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
    <main className="min-h-screen bg-gray-50">
      {/* Page heading */}
      <section className="bg-orange-600 px-6 py-16 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Your table awaits
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Reserve a Table</h1>
        <p className="mx-auto mt-4 max-w-2xl text-orange-50">
          Planning a family dinner, a date or a special celebration? Book your
          table and let us prepare for your visit.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-10">
          {confirmation ? (
            <div role="status">
              <div className="text-center">
                <div
                  aria-hidden="true"
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700"
                >
                  ✓
                </div>
                <h2
                  ref={confirmationRef}
                  tabIndex={-1}
                  className="mt-4 text-2xl font-bold text-gray-900 focus:outline-none"
                >
                  Reservation request received
                </h2>
                <p className="mt-2 text-gray-600">
                  Thank you, {confirmation.name}. Your request is pending
                  confirmation.
                </p>
                <span className="mt-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-800">
                  {STATUS_LABEL[confirmation.status] ?? confirmation.status}
                </span>
              </div>

              <dl className="mt-6 grid gap-4 rounded-xl border border-gray-200 p-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-gray-500">Date</dt>
                  <dd className="mt-0.5 font-semibold text-gray-900">
                    {formatDate(confirmation.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Time</dt>
                  <dd className="mt-0.5 font-semibold text-gray-900">
                    {formatTime(confirmation.time)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Guests</dt>
                  <dd className="mt-0.5 font-semibold text-gray-900">
                    {confirmation.guests}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Occasion</dt>
                  <dd className="mt-0.5 font-semibold text-gray-900">
                    {confirmation.occasion}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 space-y-4 rounded-xl bg-gray-50 p-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Reservation reference
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="break-all font-mono font-bold text-gray-900">
                      {confirmation.referenceCode}
                    </p>
                    <CopyButton
                      text={confirmation.referenceCode}
                      label="reservation reference"
                      className={copyButtonClass}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Private lookup code
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="break-all font-mono font-bold tracking-wider text-gray-900">
                      {confirmation.lookupCode}
                    </p>
                    <CopyButton
                      text={confirmation.lookupCode}
                      label="private lookup code"
                      className={copyButtonClass}
                    />
                  </div>
                </div>

                <CopyButton
                  text={`Reservation reference: ${confirmation.referenceCode}\nPrivate lookup code: ${confirmation.lookupCode}`}
                  label="both reservation codes"
                  className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${focusRing}`}
                >
                  Copy both codes
                </CopyButton>
              </div>

              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                Save both codes somewhere safe. The private lookup code is
                needed to check your reservation status and won’t be shown
                again after you leave this page.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/reservation-status"
                  className={`flex-1 rounded-lg bg-orange-600 px-5 py-3 text-center font-semibold text-white hover:bg-orange-700 ${focusRing}`}
                >
                  Check reservation status
                </Link>
                <button
                  type="button"
                  onClick={startAnother}
                  className={`flex-1 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 ${focusRing}`}
                >
                  Make another reservation
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">
                Reservation Details
              </h2>
              <p className="mt-2 text-gray-600">
                Fill in the form below with your preferred booking details.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <Field id="name" label="Full Name">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="email" label="Email Address">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>

                  <Field id="phone" label="Phone Number">
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="e.g. 0712345678"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="date" label="Reservation Date">
                    <input
                      id="date"
                      type="date"
                      ref={dateInputRef}
                      required
                      value={form.date}
                      onChange={(event) =>
                        updateField("date", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    id="time"
                    label="Preferred Time"
                    hint={`Seatings from ${formatTime(TIME_SLOTS[0])} to ${formatTime(TIME_SLOTS[TIME_SLOTS.length - 1])}.`}
                  >
                    <select
                      id="time"
                      required
                      value={form.time}
                      onChange={(event) =>
                        updateField("time", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {formatTime(slot)}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="guests"
                    label="Number of Guests"
                    hint={`For groups larger than ${MAX_GUESTS}, please contact us directly.`}
                  >
                    <select
                      id="guests"
                      required
                      value={form.guests}
                      onChange={(event) =>
                        updateField("guests", event.target.value)
                      }
                      className={inputClass}
                    >
                      {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map(
                        (count) => (
                          <option key={count} value={String(count)}>
                            {count} {count === 1 ? "guest" : "guests"}
                          </option>
                        )
                      )}
                    </select>
                  </Field>

                  <Field id="occasion" label="Occasion">
                    <select
                      id="occasion"
                      value={form.occasion}
                      onChange={(event) =>
                        updateField("occasion", event.target.value)
                      }
                      className={inputClass}
                    >
                      {OCCASIONS.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

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
                  disabled={submitting}
                  className={`w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                >
                  {submitting ? "Submitting…" : "Request Reservation"}
                </button>

                <p className="text-center text-sm">
                  <Link
                    href="/reservation-status"
                    className="font-medium text-orange-700 hover:underline"
                  >
                    Already made a reservation? Check your status
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}