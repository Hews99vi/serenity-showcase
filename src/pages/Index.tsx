import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Serenity Wedding Films | Cinematic Wedding Videography Sri Lanka</title>
        <meta
          name="description"
          content="Serenity Wedding Films creates cinematic wedding films in Sri Lanka. Premium 4K videography capturing your special moments with elegance and emotion."
        />
        <meta
          name="keywords"
          content="wedding videography, wedding films, Sri Lanka, cinematic wedding, 4K wedding video, wedding cinematography"
        />
        <meta property="og:title" content="Serenity Wedding Films | Cinematic Wedding Videography" />
        <meta
          property="og:description"
          content="Cinematic wedding films crafted with elegance, emotion, and timeless beauty."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://serenityweddingfilms.com" />
      </Helmet>

      <main className="overflow-hidden">
        <Navbar />
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        <Testimonials />
        <Footer />
      </main>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Index;
