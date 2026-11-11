// import Link from "next/link";
// import Image from "next/image";

// export default function FeaturedDishes() {
//     return (
//         <section className="bg-gray-50 px-6 py-20">

//         <div className="mx-auto max-w-6xl">

//           <div className="text-center">

//             <p className="font-semibold uppercase tracking-widest text-orange-600">
//               Our Favorites
//             </p>

//             <h2 className="mt-2 text-4xl font-bold">
//               Featured Dishes
//             </h2>

//             <p className="mx-auto mt-4 max-w-2xl text-gray-600">
//               Discover some of our most popular dishes, prepared fresh for
//               every customer.
//             </p>

//           </div>

//           {/* Dish Cards */}
//           <div className="mt-12 grid gap-8 md:grid-cols-3">

//             {/* Dish 1 */}
//             <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//               <div className="relative h-64">
//                 <Image
//                   src="/dish-1.jpg"
//                   alt="Featured dish"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold">
//                   Signature Dish
//                 </h3>

//                 <p className="mt-2 text-gray-600">
//                   A delicious meal prepared with our special blend of
//                   ingredients.
//                 </p>

//                 <p className="mt-4 font-bold text-orange-600">
//                   KSh 850
//                 </p>
//               </div>

//             </div>

//             {/* Dish 2 */}
//             <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//               <div className="relative h-64">
//                 <Image
//                   src="/dish-2.jpg"
//                   alt="Featured dish"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold">
//                   Chef Special
//                 </h3>

//                 <p className="mt-2 text-gray-600">
//                   One of our customer favorites, made fresh and served with
//                   care.
//                 </p>

//                 <p className="mt-4 font-bold text-orange-600">
//                   KSh 1,200
//                 </p>
//               </div>

//             </div>

//             {/* Dish 3 */}
//             <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//               <div className="relative h-64">
//                 <Image
//                   src="/dish-3.jpeg"
//                   alt="Featured dish"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-bold">
//                   House Favorite
//                 </h3>

//                 <p className="mt-2 text-gray-600">
//                   A carefully prepared dish that keeps our guests coming
//                   back.
//                 </p>

//                 <p className="mt-4 font-bold text-orange-600">
//                   KSh 950
//                 </p>
//               </div>

//             </div>

//           </div>

//           <div className="mt-10 text-center">

//             <Link
//               href="/menu"
//               className="inline-block rounded-lg bg-orange-600 px-7 py-3 font-semibold text-white hover:bg-orange-700"
//             >
//               View Full Menu
//             </Link>

//           </div>

//         </div>

//       </section>
//     );
// }


import Image from "next/image";
import Link from "next/link";

type Dish = {
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  tag?: string; // optional badge, e.g. "Most popular"
};

// Replace the alt text and tags with details that match your real photos.
const dishes: Dish[] = [
  {
    name: "Signature Dish",
    description:
      "A delicious meal prepared with our special blend of ingredients.",
    price: 850,
    image: "/dish-1.jpg",
    alt: "Our signature dish, freshly plated",
    tag: "Most popular",
  },
  {
    name: "Chef Special",
    description:
      "One of our customer favorites, made fresh and served with care.",
    price: 1200,
    image: "/dish-2.jpg",
    alt: "The chef special served on a plate",
    tag: "Chef's pick",
  },
  {
    name: "House Favorite",
    description:
      "A carefully prepared dish that keeps our guests coming back.",
    price: 950,
    image: "/dish-3.jpeg",
    alt: "Our house favorite dish",
  },
];

export default function FeaturedDishes() {
  return (
    <section id="featured-dishes" className="scroll-mt-16 bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-orange-600">
            Our Favorites
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Featured Dishes
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover some of our most popular dishes, prepared fresh for every
            customer.
          </p>
        </div>

        {/* Dish cards */}
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {dishes.map((dish) => (
            <li key={dish.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />

                  {dish.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700 shadow">
                      {dish.tag}
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 rounded-full bg-orange-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                    KSh {dish.price.toLocaleString("en-KE")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {dish.name}
                  </h3>

                  <p className="mt-2 flex-1 text-gray-600">
                    {dish.description}
                  </p>

                  <Link
                    href="/order"
                    className="mt-5 inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    Order this dish <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-block rounded-lg bg-orange-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}