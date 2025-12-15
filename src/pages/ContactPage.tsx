import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Serenity Wedding Films</title>
        <meta
          name="description"
          content="Get in touch with Serenity Wedding Films. Book your wedding videography consultation today."
        />
      </Helmet>

      <main className="overflow-hidden">
        <Navbar />
        <div className="pt-24">
          <QuoteSection />
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ContactPage;
