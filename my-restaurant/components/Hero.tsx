import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[85vh] min-h-[600px]">
        
                {/* Background Image */}
                
                <Image
                  src="/foodie.jpg"
                  alt="Delicious food served at our restaurant"
                  fill
                  priority
                  className="object-cover"
                />
        
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30" />
        
                {/* Hero Content */}
                <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
                  <div className="max-w-3xl">
        
                    <p className="mb-4 text-lg font-medium uppercase tracking-[4px]">
                      Welcome to Our Restaurant
                    </p>
        
                    <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                      Great Food.
                      <br />
                      Great Moments.
                    </h1>
        
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
                      Experience delicious meals prepared with fresh ingredients,
                      served in a warm and welcoming atmosphere.
                    </p>
        
                    {/* Buttons */}
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        
                      <Link
                        href="/menu"
                        className="rounded-lg bg-orange-600 px-7 py-3 font-semibold transition hover:bg-orange-700"
                      >
                        View Our Menu
                      </Link>
        
                      <Link
                        href="/ordering"
                        className="rounded-lg border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-black"
                      >
                        Order Now
                      </Link>
        
                    </div>
        
                  </div>
                </div>
              </section>
    );
}