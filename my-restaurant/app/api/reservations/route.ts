
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { createHash, randomBytes } from "node:crypto";
import {
  sendReservationEmail,
  sendReservationStatusEmail,
} from "@/lib/reservation-email";

const allowedOccasions = [
  "Regular Dining",
  "Birthday",
  "Anniversary",
  "Business Meeting",
  "Family Gathering",
  "Other Celebration",
];

const allowedReservationStatuses = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
];

// POST: Create a reservation (public).
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion,
    } = data;

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
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate phone number length.
    if (
      phone.trim().length < 7 ||
      phone.trim().length > 20
    ) {
      return NextResponse.json(
        { message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // Validate date format.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { message: "Please select a valid reservation date." },
        { status: 400 }
      );
    }

    // Validate time format (HH:mm).
    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return NextResponse.json(
        { message: "Please select a valid reservation time." },
        { status: 400 }
      );
    }

    const reservationDate = new Date(
      `${date}T12:00:00.000Z`
    );

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

    // Generate the public reference and private lookup code.
    const referenceCode = `RES-${randomBytes(6)
      .toString("hex")
      .toUpperCase()}`;

    const lookupCode = randomBytes(5)
      .toString("hex")
      .toUpperCase();

    // Store only the hash of the private lookup code.
    const lookupCodeHash = createHash("sha256")
      .update(lookupCode)
      .digest("hex");

    // Save the reservation to PostgreSQL.
    const reservation = await prisma.reservation.create({
      data: {
        customerName: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        reservationDate,
        reservationTime: time,
        guests: guestCount,
        occasion: selectedOccasion,
        referenceCode,
        lookupCodeHash,
      },
    });

    // Send the initial reservation email.
    let emailSent = false;

    try {
      await sendReservationEmail({
        customerName: reservation.customerName,
        email: reservation.email,
        referenceCode: reservation.referenceCode,
        reservationDate: reservation.reservationDate
          .toISOString()
          .slice(0, 10),
        reservationTime: reservation.reservationTime,
        guests: reservation.guests,
        occasion: reservation.occasion,
      });

      emailSent = true;
    } catch (emailError) {
      console.error(
        "Reservation email failed:",
        emailError
      );
    }

    return NextResponse.json(
      {
        message: "Reservation request saved successfully.",
        emailSent,
        reservation: {
          id: reservation.id,
          referenceCode: reservation.referenceCode,
          lookupCode,
          customerName: reservation.customerName,
          reservationDate: reservation.reservationDate
            .toISOString()
            .slice(0, 10),
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
      {
        message:
          "Unable to save your reservation. Please try again.",
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve reservations (admin only).
export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return auth.error;
  }

  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error("Fetching reservations failed:", error);

    return NextResponse.json(
      { message: "Unable to retrieve reservations." },
      { status: 500 }
    );
  }
}

// PATCH: Update reservation status and notify the customer (admin only).
export async function PATCH(request: Request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return auth.error;
  }

  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;
    const { id, status } = data;

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        { message: "A valid reservation ID is required." },
        { status: 400 }
      );
    }

    if (
      typeof status !== "string" ||
      !allowedReservationStatuses.includes(status)
    ) {
      return NextResponse.json(
        { message: "Please select a valid reservation status." },
        { status: 400 }
      );
    }

    // Find the existing reservation before updating it.
    const existingReservation =
      await prisma.reservation.findUnique({
        where: { id: id.trim() },
      });

    if (!existingReservation) {
      return NextResponse.json(
        { message: "Reservation not found." },
        { status: 404 }
      );
    }

    // Save the new status.
    const reservation = await prisma.reservation.update({
      where: { id: id.trim() },
      data: { status },
    });

    let emailSent: boolean | null = null;

    // Notify the customer only when the status actually changes
    // to CONFIRMED or CANCELLED.
    if (
      existingReservation.status !== reservation.status &&
      ["CONFIRMED", "CANCELLED"].includes(
        reservation.status
      )
    ) {
      emailSent = false;

      try {
        await sendReservationStatusEmail({
          customerName: reservation.customerName,
          email: reservation.email,
          referenceCode: reservation.referenceCode,
          reservationDate: reservation.reservationDate
            .toISOString()
            .slice(0, 10),
          reservationTime: reservation.reservationTime,
          guests: reservation.guests,
          status: reservation.status,
        });

        emailSent = true;
      } catch (emailError) {
        console.error(
          "Reservation status email failed:",
          emailError
        );
      }
    }

    return NextResponse.json({
      message: "Reservation status updated.",
      reservation,
      emailSent,
    });
  } catch (error) {
    console.error("Updating reservation failed:", error);

    return NextResponse.json(
      { message: "Unable to update reservation." },
      { status: 500 }
    );
  }
}
