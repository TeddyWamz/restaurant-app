import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedDishes from "@/components/FeaturedDishes";
import Services from "@/components/Services";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    

    <main>
      

      {/* Hero Section */}
      <Hero />

      {/* Featured Dishes */}
      <FeaturedDishes />

      {/* Services Section */}
      <Services /> 

      {/* Location Section */}
      <Location />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

    </main>
   
    
  );
}