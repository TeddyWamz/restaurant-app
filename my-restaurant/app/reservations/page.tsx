
"use client";

import Navbar from "@/components/NavBar";
import { useEffect, useRef, useState, type FormEvent } from "react";

export default function ReservationsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("Regular Dining");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dateInput = dateInputRef.current;
    if (!dateInput) return;

    const today = new Date();
    dateInput.min = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
  }, []);

  
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setSubmitted(false);
  setErrorMessage("");

  if (submitting) return;

  setSubmitting(true);

  try {
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        date,
        time,
        guests,
        occasion,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Unable to submit your reservation."
      );
    }

    setSubmitted(true);
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

        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Reserve a Table
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-orange-50">
          Planning a family dinner, a date or a special celebration?
          Book your table and let us prepare for your visit.
        </p>
      </section>

      {/* Reservation form */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Reservation Details
          </h2>

          <p className="mt-2 text-gray-600">
            Fill in the form below with your preferred booking details.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Customer name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSubmitted(false);
                  setErrorMessage("");
                }}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Email and phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  placeholder="e.g. 0712345678"
                  className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            {/* Date and time */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Reservation Date
                </label>

                <input
                  id="date"
                  type="date"
                  ref={dateInputRef}
                  required
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Preferred Time
                </label>

                <select
                  id="time"
                  required
                  value={time}
                  onChange={(event) => {
                    setTime(event.target.value);
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select a time</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            {/* Guests and occasion */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="guests"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Number of Guests
                </label>

                <select
                  id="guests"
                  required
                  value={guests}
                  onChange={(event) => {
                    setGuests(event.target.value);
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  className="w-full rounded-lg border border-gray-300 text-gray-500 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5 guests</option>
                  <option value="6">6 guests</option>
                  <option value="7">7 guests</option>
                  <option value="8">8 guests</option>
                  <option value="9">9 guests</option>
                  <option value="10">10 guests</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="occasion"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Occasion
                </label>

                <select
                  id="occasion"
                  value={occasion}
                  onChange={(event) => {
                    setOccasion(event.target.value);
                    setSubmitted(false);
                    setErrorMessage("");
                  }}
                  className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option>Regular Dining</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business Meeting</option>
                  <option>Family Gathering</option>
                  <option>Other Celebration</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-orange-600 px-6 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Request Reservation"}
            </button>
          </form>


          {errorMessage && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 p-5 text-red-900"
            >
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Confirmation */}
          {submitted && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-green-900"
            >
              <h3 className="text-lg font-bold">
                Reservation Request Preview
              </h3>

              <p className="mt-2">
                Thank you, {name}! Here are your selected details:
              </p>

              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <strong>Date:</strong> {date}
                </li>
                <li>
                  <strong>Time:</strong>{" "}
                  {new Date(
                    `2000-01-01T${time}:00`
                  ).toLocaleTimeString("en-KE", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </li>
                <li>
                  <strong>Guests:</strong> {guests}
                </li>
                <li>
                  <strong>Occasion:</strong> {occasion}
                </li>
                <li>
                  <strong>Contact:</strong> {phone} · {email}
                </li>
              </ul>

              <p className="mt-4 text-sm">
                This is a demonstration only. Your reservation has not
                been sent to the restaurant, and availability has not
                been checked.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
    
  );
}