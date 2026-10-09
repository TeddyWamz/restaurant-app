
"use client";

import NavBar from "@/components/NavBar";
import { useState, useSyncExternalStore } from "react";

const openingHours = [
  { day: "Sunday", open: "09:00", close: "21:00" },
  { day: "Monday", open: "08:00", close: "21:00" },
  { day: "Tuesday", open: "08:00", close: "21:00" },
  { day: "Wednesday", open: "08:00", close: "21:00" },
  { day: "Thursday", open: "08:00", close: "21:00" },
  { day: "Friday", open: "08:00", close: "22:00" },
  { day: "Saturday", open: "09:00", close: "22:00" },
];

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date(2000, 0, 1, hours, minutes);

  return date.toLocaleTimeString("en-KE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function subscribeToClock(onChange: () => void) {
  const interval = setInterval(onChange, 1000);
  return () => clearInterval(interval);
}

function getClockSnapshot() {
  return Math.floor(Date.now() / 60000) * 60000;
}

function getServerClockSnapshot() {
  return null;
}

export default function AvailabilityPage() {
  const timestamp = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [checked, setChecked] = useState(false);

  const today = timestamp === null ? null : new Date(timestamp);
  const minDate = today
    ? [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-")
    : "";
  const effectiveDate = selectedDate || minDate;
  const chosenDate = effectiveDate
    ? new Date(`${effectiveDate}T12:00:00`)
    : null;
  const dayHours = chosenDate ? openingHours[chosenDate.getDay()] : undefined;
  const todayHours = today ? openingHours[today.getDay()] : undefined;
  const currentTime = today ? today.getHours() * 60 + today.getMinutes() : 0;

  const openingTime = todayHours
    ? Number(todayHours.open.split(":")[0]) * 60 +
      Number(todayHours.open.split(":")[1])
    : 0;

  const closingTime = todayHours
    ? Number(todayHours.close.split(":")[0]) * 60 +
      Number(todayHours.close.split(":")[1])
    : 0;

  const isCurrentlyOpen =
    !!todayHours &&
    currentTime >= openingTime &&
    currentTime < closingTime;

  function checkAvailability() {
    setChecked(true);
  }

  return (
    
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-orange-600 px-6 py-16 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Plan your visit
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          Opening Hours & Availability
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-orange-50">
          Check our usual opening hours and plan your next meal with us.
        </p>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-2">
        {/* Current status */}
        <section className="rounded-2xl bg-white p-7 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Restaurant Status
          </h2>

          <div className="mt-6 rounded-xl border border-gray-200 p-5">
            {!today ? (
              <p role="status" className="text-gray-600">
                Checking status...
              </p>
            ) : isCurrentlyOpen ? (
              <div>
                <p className="font-bold text-green-700">
                  ● Currently Open
                </p>

                <p className="mt-2 text-gray-600">
                  We&apos;re open today until{" "}
                  {todayHours ? formatTime(todayHours.close) : ""}.
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-red-600">
                  ● Currently Closed
                </p>

                <p className="mt-2 text-gray-600">
                  {todayHours
                    ? `Our usual hours today are ${formatTime(
                        todayHours.open
                      )} – ${formatTime(todayHours.close)}.`
                    : "The restaurant is closed today."}
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            This status uses your computer&apos;s local clock and the sample
            schedule below. Special holiday hours are not included.
          </p>
        </section>

        {/* Weekly schedule */}
        <section className="rounded-2xl bg-white p-7 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Weekly Opening Hours
          </h2>

          <div className="mt-6 divide-y divide-gray-100">
            {openingHours.map((item) => (
              <div
                key={item.day}
                className={`flex items-center justify-between gap-4 py-4 ${
                  item.day === todayHours?.day
                    ? "font-bold text-orange-600"
                    : "text-gray-700"
                }`}
              >
                <span>{item.day}</span>

                <span className="text-right text-sm sm:text-base">
                  {formatTime(item.open)} – {formatTime(item.close)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Date checker */}
        <section className="rounded-2xl bg-white p-7 shadow-md lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Check a Date
          </h2>

          <p className="mt-2 text-gray-600">
            Select a date to view the restaurant&apos;s usual opening schedule.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="w-full sm:max-w-sm">
              <label
                htmlFor="selectedDate"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Choose a Date
              </label>

              <input
                id="selectedDate"
                type="date"
                min={minDate}
                value={effectiveDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setChecked(false);
                }}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              type="button"
              onClick={checkAvailability}
              disabled={!chosenDate}
              className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Check Hours
            </button>
          </div>

          {checked && chosenDate && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5"
            >
              <h3 className="font-bold text-gray-900">
                Schedule for{" "}
                {chosenDate.toLocaleDateString("en-KE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              {dayHours ? (
                <p className="mt-2 text-gray-700">
                  Our usual opening hours are{" "}
                  <strong>{formatTime(dayHours.open)}</strong> to{" "}
                  <strong>{formatTime(dayHours.close)}</strong>.
                </p>
              ) : (
                <p className="mt-2 text-gray-700">
                  The restaurant is scheduled to be closed on this day.
                </p>
              )}

              <p className="mt-3 text-sm text-gray-600">
                This displays scheduled hours only. It does not verify
                table availability or special closures.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
    
  );
}