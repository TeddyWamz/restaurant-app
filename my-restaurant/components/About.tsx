import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <section className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
        
                  <div className="grid items-center gap-12 md:grid-cols-2">
        
                    <div>
                      <p className="mb-3 font-semibold uppercase tracking-widest text-orange-600">
                        About Us
                      </p>
        
                      <h2 className="text-4xl font-bold">
                        Food Made With Passion
                      </h2>
        
                      <p className="mt-6 leading-7 text-gray-600">
                        We believe that great food brings people together. Our
                        restaurant is dedicated to serving delicious meals made from
                        fresh ingredients while providing a comfortable and welcoming
                        environment for our guests.
                      </p>
        
                      <p className="mt-4 leading-7 text-gray-600">
                        Whether you are joining us for a quick lunch, a family dinner,
                        or a special occasion, we are here to make every visit
                        memorable.
                      </p>
        
                      <Link
                        href="/about"
                        className="mt-6 inline-block font-semibold text-orange-600 hover:text-orange-700"
                      >
                        Learn More →
                      </Link>
                    </div>
        
                    <div className="relative h-[400px] overflow-hidden rounded-2xl">
                      <Image
                        src="/foodie-about.jpg"
                        alt="Restaurant interior"
                        fill
                        className="object-cover"
                      />
                    </div>
        
                  </div>
        
                </div>
              </section>
    );
}