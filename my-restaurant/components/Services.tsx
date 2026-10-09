import Link from "next/link";

export default function Services() {
    return (
        <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          {/* Section Heading */}
          <div className="text-center">

            <p className="font-semibold uppercase tracking-widest text-orange-600">
              Our Services
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              More Than Just Great Food
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Whether you want to dine with us, enjoy your meal from home,
              or reserve a table for a special occasion, we have got you covered.
            </p>

          </div>

          {/* Services */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {/* Delivery */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                🚚
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Delivery
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Enjoy your favorite meals from the comfort of your home.
                Place an order and we will take care of the rest.
              </p>

              <Link
                href="/ordering"
                className="mt-6 inline-block font-semibold text-orange-600 hover:text-orange-700"
              >
                Order Now →
              </Link>

            </div>

            {/* Reservations */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                📅
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Reservations
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Planning a special dinner? Reserve a table in advance and
                let us prepare a memorable experience for you.
              </p>

              <Link
                href="/reservations"
                className="mt-6 inline-block font-semibold text-orange-600 hover:text-orange-700"
              >
                Reserve a Table →
              </Link>

            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                🕐
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Opening Hours
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Check our opening hours and plan your visit at a time that
                works best for you.
              </p>

              <Link
                href="/availability"
                className="mt-6 inline-block font-semibold text-orange-600 hover:text-orange-700"
              >
                Check Hours →
              </Link>

            </div>

          </div>

        </div>
      </section>
    );
}