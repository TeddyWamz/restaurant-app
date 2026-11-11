
import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ReservationEmailDetails = {
  customerName: string;
  email: string;
  referenceCode: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  occasion: string;
};

export async function sendReservationEmail(
  reservation: ReservationEmailDetails
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const { data, error } = await resend.emails.send({
    from:
      process.env.EMAIL_FROM ||
      "Restaurant Reservations <onboarding@resend.dev>",
    to: [reservation.email],
    subject: `Reservation received: ${reservation.referenceCode}`,
    text: `
Hello ${reservation.customerName},

Thank you for submitting a reservation request.

Reference: ${reservation.referenceCode}
Date: ${reservation.reservationDate}
Time: ${reservation.reservationTime}
Guests: ${reservation.guests}
Occasion: ${reservation.occasion}
Status: PENDING

Your request has been received and is awaiting confirmation.

Please keep the reference number. Your private lookup code is
shown on the confirmation page, so save it somewhere safe.

Regards,
Restaurant Reservations
    `.trim(),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


type ReservationStatusEmailDetails = {
  customerName: string;
  email: string;
  referenceCode: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  status: string;
};

export async function sendReservationStatusEmail(
  reservation: ReservationStatusEmailDetails
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const status = reservation.status.toUpperCase();

  if (!["CONFIRMED", "CANCELLED"].includes(status)) {
    throw new Error("Unsupported reservation status.");
  }

  const isConfirmed = status === "CONFIRMED";

  const { data, error } = await resend.emails.send({
    from:
      process.env.EMAIL_FROM ||
      "Restaurant Reservations <onboarding@resend.dev>",
    to: [reservation.email],
    subject: isConfirmed
      ? `Reservation confirmed: ${reservation.referenceCode}`
      : `Reservation cancelled: ${reservation.referenceCode}`,
    text: `
Hello ${reservation.customerName},

Your reservation status has been updated.

Reference: ${reservation.referenceCode}
Date: ${reservation.reservationDate}
Time: ${reservation.reservationTime}
Guests: ${reservation.guests}
Status: ${status}

${
  isConfirmed
    ? "Your reservation is confirmed. We look forward to welcoming you!"
    : "Your reservation has been cancelled. Please contact the restaurant if you need assistance."
}

Regards,
Restaurant Reservations
    `.trim(),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
