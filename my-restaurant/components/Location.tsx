export default function Location() {
  return (
    <section className="px-6 py-20 bg-gray-100">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-orange-600">
            Find Us
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-500">
            Visit Our Restaurant
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Come and enjoy a delicious meal in a warm and welcoming
            environment.
          </p>

        </div>

        {/* Location Content */}
        <div className="mt-12 grid gap-10 md:grid-cols-2">

          {/* Restaurant Information */}
          <div className="flex flex-col justify-center">

            <h3 className="text-2xl font-bold text-gray-500">
              Our Location
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              We are conveniently located in the heart of Nairobi,
              making it easy for you to visit us.
            </p>

            {/* Address */}
            <div className="mt-8 flex gap-4">

              <div className="text-2xl">
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

            {/* Phone */}
            <div className="mt-6 flex gap-4">

              <div className="text-2xl">
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

            {/* Opening Hours */}
            <div className="mt-6 flex gap-4">

              <div className="text-2xl">
                🕐
              </div>

              <div>
                <h4 className="font-semibold text-gray-500">
                  Opening Hours
                </h4>

                <p className="mt-1 text-gray-600">
                  Monday - Friday: 10:00 AM - 10:00 PM
                  <br />
                  Saturday: 9:00 AM - 11:00 PM
                  <br />
                  Sunday: 10:00 AM - 9:00 PM
                </p>
              </div>

            </div>

          </div>

          {/* Google Map */}
          <div className="overflow-hidden rounded-2xl shadow-lg">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63815.44194780703!2d36.95225995!3d-1.4922930500000036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182fa029a32ea761%3A0x1b98a0c9cee3a824!2sKitengela!5e0!3m2!1sen!2ske!4v1791489342220!5m2!1sen!2ske"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            />

          </div>

        </div>

      </div>
    </section>
  );
}