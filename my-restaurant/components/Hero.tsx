// import Image from "next/image";
// import Link from "next/link";

// export default function Hero() {
//     return (
//         <section className="relative h-[85vh] min-h-[600px]">
        
//                 {/* Background Image */}
                
//                 <Image
//                   src="/foodie.jpg"
//                   alt="Delicious food served at our restaurant"
//                   fill
//                   priority
//                   className="object-cover"
//                 />
        
//                 {/* Dark Overlay */}
//                 <div className="absolute inset-0 bg-black/30" />
        
//                 {/* Hero Content */}
//                 <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
//                   <div className="max-w-3xl">
        
//                     <p className="mb-4 text-lg font-medium uppercase tracking-[4px]">
//                       Welcome to Our Restaurant
//                     </p>
        
//                     <h1 className="text-5xl font-bold leading-tight md:text-7xl">
//                       Great Food.
//                       <br />
//                       Great Moments.
//                     </h1>
        
//                     <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
//                       Experience delicious meals prepared with fresh ingredients,
//                       served in a warm and welcoming atmosphere.
//                     </p>
        
//                     {/* Buttons */}
//                     <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        
//                       <Link
//                         href="/menu"
//                         className="rounded-lg bg-orange-600 px-7 py-3 font-semibold transition hover:bg-orange-700"
//                       >
//                         View Our Menu
//                       </Link>
        
//                       <Link
//                         href="/ordering"
//                         className="rounded-lg border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-black"
//                       >
//                         Order Now
//                       </Link>
        
//                     </div>
        
//                   </div>
//                 </div>
//               </section>
//     );
// }


import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate flex h-[calc(100svh-4rem)] max-h-[900px] min-h-[560px] items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/foodie.jpg"
        alt="Delicious food served at our restaurant"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/* Gradient overlay: darker at top and bottom, where the text and cue sit */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/70"
      />

      {/* Content */}
      <div className="px-6 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300 sm:text-base">
            Welcome to Our Restaurant
          </p>

          <h1 className="text-5xl font-extrabold leading-tight drop-shadow-lg md:text-7xl">
            Great Food.
            <br />
            <span className="text-orange-400">Great Moments.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-100 md:text-xl">
            Experience delicious meals prepared with fresh ingredients, served
            in a warm and welcoming atmosphere.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="w-full rounded-lg bg-orange-600 px-8 py-3.5 text-lg font-semibold shadow-lg transition hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 sm:w-auto"
            >
              View Our Menu
            </Link>

            <Link
              href="/order"
              className="w-full rounded-lg border-2 border-white px-8 py-3.5 text-lg font-semibold transition hover:bg-white hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 sm:w-auto"
            >
              Order Now
            </Link>
          </div>

          {/* Secondary action */}
          <p className="mt-6 text-gray-200">
            Planning a visit?{" "}
            <Link
              href="/reservations"
              className="font-semibold text-orange-300 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Reserve a table →
            </Link>
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#featuredDishes"
        aria-label="Scroll to featured dishes"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/80 transition hover:text-white sm:block"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 animate-bounce motion-reduce:animate-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}