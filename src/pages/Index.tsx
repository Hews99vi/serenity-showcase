import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import QualitySection from "@/components/home/QualitySection";
import FeaturedFilms from "@/components/home/FeaturedFilms";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";
import SideNav from "@/components/home/SideNav";
import Footer from "@/components/Footer";

const Index = () => {
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

      <main className="overflow-hidden bg-charcoal">
        <Navbar />
        <SideNav />
        <HeroSection />
        <IntroSection />
        <PhilosophySection />
        <QualitySection />
        <div id="featured">
          <FeaturedFilms />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;
