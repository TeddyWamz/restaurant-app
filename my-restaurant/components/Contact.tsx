import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 px-6 py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-orange-600">
            Contact Us
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-500">
            We&apos;d Love to Hear From You
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Have a question, suggestion, or special request?
            Get in touch with our team.
          </p>

        </div>

        {/* Contact Content */}
        <div className="mt-12 grid gap-10 md:grid-cols-2">

          {/* Contact Information */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h3 className="text-2xl font-bold text-gray-500">
              Get In Touch
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Our team is happy to help. You can reach us using any of
              the contact details below.
            </p>

            {/* Phone */}
            <div className="mt-8 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
                📞
              </div>

              <div>
                <h4 className="font-semibold text-gray-500">
                  Phone
                </h4>

                <p className="mt-1 text-gray-600">
                  +254 700 000 000
                </p>
              </div>

            </div>

            {/* Email */}
            <div className="mt-6 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
                ✉️
              </div>

              <div>
                <h4 className="font-semibold text-gray-500">
                  Email
                </h4>

                <p className="mt-1 text-gray-600">
                  info@restaurant.com
                </p>
              </div>

            </div>

            {/* Address */}
            <div className="mt-6 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl">
                📍
              </div>

              <div>
                <h4 className="font-semibold text-gray-500">
                  Address
                </h4>

                <p className="mt-1 text-gray-600">
                  123 Example Street
                  <br />
                  Nairobi, Kenya
                </p>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h3 className="text-2xl font-bold text-gray-500">
              Send Us a Message
            </h3>

            <form className="mt-6 space-y-5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-500"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-orange-500 text-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-500"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-orange-500 text-gray-500"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-500"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-orange-500 text-gray-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}