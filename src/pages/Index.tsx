import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedFilms from "@/components/home/FeaturedFilms";
import FilmCategories from "@/components/home/FilmCategories";
import Destinations from "@/components/home/Destinations";
import Engagements from "@/components/home/Engagements";
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
        <div id="featured">
          <FeaturedFilms />
        </div>
        <div id="teasers">
          <FilmCategories />
        </div>
        <div id="destinations">
          <Destinations />
        </div>
        <div id="engagements">
          <Engagements />
        </div>
        <ContactCTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;
