import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Serenity Wedding Films</title>
        <meta
          name="description"
          content="Learn about Serenity Wedding Films - our story, philosophy, and commitment to capturing timeless wedding moments in stunning 4K quality."
        />
      </Helmet>

      <main className="overflow-hidden">
        <Navbar />
        <div className="pt-24">
          <About />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
