import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Services | Serenity Wedding Films</title>
        <meta
          name="description"
          content="Discover our wedding videography services - cinematic wedding films, pre-wedding shoots, homecoming films, and more in Sri Lanka."
        />
      </Helmet>

      <main className="overflow-hidden">
        <Navbar />
        <Services />
        <Footer />
      </main>
    </>
  );
};

export default ServicesPage;
