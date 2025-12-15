import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

const PortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | Serenity Wedding Films</title>
        <meta
          name="description"
          content="Explore our collection of cinematic wedding films. Watch beautiful wedding stories from couples across Sri Lanka."
        />
      </Helmet>

      <main className="overflow-hidden">
        <Navbar />
        <div className="pt-24">
          <Portfolio />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PortfolioPage;
