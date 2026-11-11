
import { NextResponse } from "next/server";
import {
  createHash,
  timingSafeEqual,
} from "node:crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const referenceCode =
      typeof body.referenceCode === "string"
        ? body.referenceCode.trim().toUpperCase()
        : "";

    const lookupCode =
      typeof body.lookupCode === "string"
        ? body.lookupCode.trim().toUpperCase()
        : "";

    // Validate the expected formats before querying the database.
    if (
      !/^RES-[A-F0-9]{12}$/.test(referenceCode) ||
      !/^[A-F0-9]{10}$/.test(lookupCode)
    ) {
      return NextResponse.json(
        {
          message:
            "Reservation not found or lookup details are incorrect.",
        },
        { status: 404 }
      );
    }

    // Find the reservation using its public reference number.
    const reservation = await prisma.reservation.findUnique({
      where: { referenceCode },
    });

    if (!reservation || !reservation.lookupCodeHash) {
      return NextResponse.json(
        {
          message:
            "Reservation not found or lookup details are incorrect.",
        },
        { status: 404 }
      );
    }

    // Hash the supplied code. The database stores only its hash.
    const submittedHash = createHash("sha256")
      .update(lookupCode)
      .digest("hex");

    // Compare equal-length buffers safely.
    const storedHash = reservation.lookupCodeHash;

    if (!/^[a-f0-9]{64}$/i.test(storedHash)) {
      return NextResponse.json(
        {
          message:
            "Reservation not found or lookup details are incorrect.",
        },
        { status: 404 }
      );
    }

    const hashesMatch = timingSafeEqual(
      Buffer.from(submittedHash, "hex"),
      Buffer.from(storedHash, "hex")
    );

    if (!hashesMatch) {
      return NextResponse.json(
        {
          message:
            "Reservation not found or lookup details are incorrect.",
        },
        { status: 404 }
      );
    }

    // Return only the booking details needed by the customer.
    return NextResponse.json({
      reservation: {
        referenceCode: reservation.referenceCode,
        reservationDate: reservation.reservationDate
          .toISOString()
          .slice(0, 10),
        reservationTime: reservation.reservationTime,
        guests: reservation.guests,
        occasion: reservation.occasion,
        status: reservation.status,
      },
    });
  } catch (error) {
    console.error("Reservation status lookup failed:", error);

    return NextResponse.json(
      { message: "Unable to check your reservation right now." },
      { status: 500 }
    );
  }
}
