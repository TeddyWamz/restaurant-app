
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedOccasions = [
  "Regular Dining",
  "Birthday",
  "Anniversary",
  "Business Meeting",
  "Family Gathering",
  "Other Celebration",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion,
    } = body;

    // Validate required fields.
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      return NextResponse.json(
        { message: "Please provide all required details." },
        { status: 400 }
      );
    }

    // Validate email format.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate phone number length.
    if (phone.trim().length < 7 || phone.trim().length > 20) {
      return NextResponse.json(
        { message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // Validate date and time formats.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { message: "Please select a valid reservation date." },
        { status: 400 }
      );
    }

    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return NextResponse.json(
        { message: "Please select a valid reservation time." },
        { status: 400 }
      );
    }

    const reservationDate = new Date(`${date}T12:00:00.000Z`);

    if (
      Number.isNaN(reservationDate.getTime()) ||
      reservationDate.toISOString().slice(0, 10) !== date
    ) {
      return NextResponse.json(
        { message: "The reservation date is invalid." },
        { status: 400 }
      );
    }

    // Validate guest count.
    const guestCount = Number(guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 10
    ) {
      return NextResponse.json(
        { message: "Guest count must be between 1 and 10." },
        { status: 400 }
      );
    }

    // Validate occasion.
    const selectedOccasion =
      typeof occasion === "string" &&
      allowedOccasions.includes(occasion)
        ? occasion
        : null;

    if (!selectedOccasion) {
      return NextResponse.json(
        { message: "Please select a valid occasion." },
        { status: 400 }
      );
    }

    // Save the reservation request to PostgreSQL.
    const reservation = await prisma.reservation.create({
      data: {
        customerName: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        reservationDate,
        reservationTime: time,
        guests: guestCount,
        occasion: selectedOccasion,
      },
    });

    return NextResponse.json(
      {
        message: "Reservation request saved successfully.",
        reservation: {
          id: reservation.id,
          customerName: reservation.customerName,
          reservationDate: date,
          reservationTime: reservation.reservationTime,
          guests: reservation.guests,
          status: reservation.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reservation creation failed:", error);

    return NextResponse.json(
      { message: "Unable to save your reservation. Please try again." },
      { status: 500 }
    );
  }
}