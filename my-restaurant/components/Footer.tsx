import Link from "next/link";
import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Order Online", href: "/ordering" },
  { label: "Reservations", href: "/reservations" },
  { label: "Availability", href: "/availability" },
  { label: "Contact Us", href: "/#contact" },
];

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="bg-gray-950 px-6 py-12 text-gray-300">

      <div className="mx-auto max-w-6xl">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Restaurant */}
          <div>

            <h2 className="text-2xl font-bold text-white">
              Restaurant
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Delicious food, warm hospitality, and memorable dining
              experiences.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition hover:text-orange-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          </div>

          {/* Services */}
          {/* <div>

            <h3 className="font-semibold text-white">
              Services
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                href="/ordering"
                className="hover:text-white"
              >
                Delivery
              </Link>

              <Link
                href="/reservations"
                className="hover:text-white"
              >
                Reservations
              </Link>

              <Link
                href="/availability"
                className="hover:text-white"
              >
                Opening Hours
              </Link>

            </div>

          </div> */}

          {/* Contact */}
          {/* <div>

            <h3 className="font-semibold text-white">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-gray-400">

              <p>📍 Nairobi, Kenya</p>

              <p>📞 +254 700 000 000</p>

              <p>✉️ info@restaurant.com</p>

            </div>

          </div> */}

           {/* Contact information */}
        <div>
          <h2 className="text-lg font-bold text-white">
            Contact Information
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <span className="font-semibold text-gray-200">📞 Phone:</span>{" "}
              +254 700 000 000
            </li>
            <li>
              <span className="font-semibold text-gray-200">✉️ Email:</span>{" "}
              info@restaurant.com
            </li>
            <li>
              <span className="font-semibold text-gray-200">📍 Address:</span>{" "}
             Nairobi, Kenya
            </li>
          </ul>

          <Link
            href="/availability"
            className="mt-5 inline-block font-semibold text-orange-500 hover:text-orange-400"
          >
            View Opening Hours →
          </Link>
        </div>
      

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">

          <p>
            © {year} Restaurant. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}