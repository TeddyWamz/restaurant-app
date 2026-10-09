import Navbar from "@/components/NavBar";

export default function Contact() {
  return (
    <main>
      <Navbar />
      <section className="flex min-h-[80vh] items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Get in touch with us for any inquiries or support.
          </p>
        </div>
      </section>
    </main>
  );
}