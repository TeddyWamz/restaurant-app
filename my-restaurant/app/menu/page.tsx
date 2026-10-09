
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken",
    description: "Tender grilled chicken served with seasoned potatoes and fresh vegetables.",
    price: 850,
    category: "Main Course",
    image: "/dish-1.jpg",
  },
  {
    id: 2,
    name: "Beef Burger",
    description: "A juicy beef patty with fresh lettuce, tomato, cheese and our special sauce.",
    price: 650,
    category: "Main Course",
    image: "/dish-2.jpg",
  },
  {
    id: 3,
    name: "Creamy Pasta",
    description: "Delicious pasta tossed in a creamy sauce with herbs and parmesan.",
    price: 700,
    category: "Main Course",
    image: "/dish-3.jpeg",
  },
  {
    id: 4,
    name: "Chicken and Rice",
    description: "A satisfying chicken dish served with perfectly cooked rice and vegetables.",
    price: 600,
    category: "Main Course",
    image: "/dish-1.jpg",
  },
  {
    id: 5,
    name: "Classic Cheeseburger",
    description: "A classic cheeseburger served with crispy fries and a house-made sauce.",
    price: 750,
    category: "Fast Food",
    image: "/dish-2.jpg",
  },
  {
    id: 6,
    name: "Pasta Special",
    description: "Our chef's pasta special prepared with fresh ingredients and herbs.",
    price: 800,
    category: "Chef's Special",
    image: "/dish-3.jpeg",
  },
];

export default function MenuPage() {
  return (

      <main className="min-h-screen bg-gray-50">
        {/* Page heading */}
        <section className="bg-orange-600 px-6 py-16 text-center text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]">
            Freshly prepared for you
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Our Menu
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-orange-50">
            Discover delicious meals made with fresh ingredients.
            Find your favourite dish and place your order.
          </p>
        </section>

        {/* Menu cards */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Our Dishes
            </h2>

            <p className="mt-3 text-gray-600">
              Great food, generous portions and flavours you&apos;ll love.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Food image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Dish information */}
                <div className="p-6">
                  <p className="mb-2 text-sm font-medium text-orange-600">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-3 min-h-16 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-xl font-bold text-gray-900">
                      KSh {item.price.toLocaleString("en-KE")}
                    </p>

                    <Link
                      href={`/ordering?item=${encodeURIComponent(item.name)}`}
                      className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      
    
  );
}