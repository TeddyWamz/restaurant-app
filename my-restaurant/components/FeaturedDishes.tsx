import Link from "next/link";
import Image from "next/image";

export default function FeaturedDishes() {
    return (
        <section className="bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-widest text-orange-600">
              Our Favorites
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Featured Dishes
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Discover some of our most popular dishes, prepared fresh for
              every customer.
            </p>

          </div>

          {/* Dish Cards */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">

            {/* Dish 1 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="relative h-64">
                <Image
                  src="/dish-1.jpg"
                  alt="Featured dish"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">
                  Signature Dish
                </h3>

                <p className="mt-2 text-gray-600">
                  A delicious meal prepared with our special blend of
                  ingredients.
                </p>

                <p className="mt-4 font-bold text-orange-600">
                  KSh 850
                </p>
              </div>

            </div>

            {/* Dish 2 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="relative h-64">
                <Image
                  src="/dish-2.jpg"
                  alt="Featured dish"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">
                  Chef Special
                </h3>

                <p className="mt-2 text-gray-600">
                  One of our customer favorites, made fresh and served with
                  care.
                </p>

                <p className="mt-4 font-bold text-orange-600">
                  KSh 1,200
                </p>
              </div>

            </div>

            {/* Dish 3 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="relative h-64">
                <Image
                  src="/dish-3.jpeg"
                  alt="Featured dish"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">
                  House Favorite
                </h3>

                <p className="mt-2 text-gray-600">
                  A carefully prepared dish that keeps our guests coming
                  back.
                </p>

                <p className="mt-4 font-bold text-orange-600">
                  KSh 950
                </p>
              </div>

            </div>

          </div>

          <div className="mt-10 text-center">

            <Link
              href="/menu"
              className="inline-block rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white hover:bg-orange-700"
            >
              View Full Menu
            </Link>

          </div>

        </div>

      </section>
    );
}