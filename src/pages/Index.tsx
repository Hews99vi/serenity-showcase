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
        <title>Serenity Wedding Films | Cinematic Wedding Experience</title>
        <meta
          name="description"
          content="Serenity Wedding Films creates timeless wedding films in Sri Lanka. Where Serenity Meets Cinema, Love Becomes a Masterpiece."
        />
        <meta
          name="keywords"
          content="wedding videography, wedding films, Sri Lanka, cinematic wedding, 4K wedding video, wedding cinematography, Serenity Wedding Films"
        />
        <meta property="og:title" content="Serenity Wedding Films" />
        <meta
          property="og:description"
          content="Where Serenity Meets Cinema, Love Becomes a Masterpiece. Timeless wedding films in Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://serenityweddingfilms.com/" />
        <meta property="og:image" content="https://serenityweddingfilms.com/og-image.jpg" />
        <link rel="canonical" href="https://serenityweddingfilms.com/" />
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
